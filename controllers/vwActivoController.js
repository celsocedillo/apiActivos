const logger = require('../utils/logger');
const VwActivo = require('../model/').VwActivo;


module.exports = {

	async getActivoByCodigo(req, res){
		try{ 
			const codigo = req.params.pcodigo;
			let condicionWhere = {};
			if (req.body.buscarCodigo != undefined ){
				condicionWhere = {$and: []};
				if (req.body.buscarCodigo == 'codEcapag'){
					condicionWhere.$and.push({codEcapag: codigo});
				}else if (req.body.buscarCodigo == 'codActControl'){
					condicionWhere.$and.push({codActControl: codigo});
				}else if(req.body.buscarCodigo == 'codConces'){
					condicionWhere.$and.push({codConces: codigo});
				}
				condicionWhere.$and.push({estSitId: req.body.estadoSituacionId});
			}else{
				condicionWhere = {$and: [
										  {codEcapag: codigo}, 
										  {estSitId: req.body.estadoSituacionId}
										]
					   			   };
			}
			const registro = await VwActivo.findOne({where: condicionWhere});
			res.status(201).send(registro);
		}
		catch(e){
			logger.error(e);
			res.status(500).send(e);
		}

	},

	async getActivoByFiltroCodigo(req, res){
		try{ 
			const buscar = '%'+req.params.pfiltro+'%';
			let condicionWhere = {$or: [
										  {codActControl: {$like: buscar}}, 
										  {codEcapag: {$like: buscar}}, 
										  {codConces: {$like: buscar}}
										 ],
					   				$and: {estSitId: req.query.estadoSituacionId}
					   			   };
			const registro = await VwActivo.findAll({where: condicionWhere,
													 order: ['codActControl', 'codEcapag', 'codConces'],
													 limit: 5
													});
			res.status(201).send(registro);
		}
		catch(e){
			logger.error(e);
			res.status(500).send(e);
		}
	}

}

