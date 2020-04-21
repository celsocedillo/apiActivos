const ArchivoMigracion = require('../model/').ArchivoMigracion;
const ActivoMigracion = require('../model').ActivoMigracion;
const EstadoSituacion = require('../model/').EstadoSituacion;
const logger = require('../utils/logger');


module.exports = {

    async getAll(req, res){
        try{ 
			const registro = await ArchivoMigracion.findAll({});
			res.status(201).send(registro);
		}
		catch(e){
			logger.error(e);
			res.status(500).send(e);
		}

    },

    async getArchivoMigracion(req, res){
        try{
			const registro = await ArchivoMigracion.findOne({
				include: [{model: EstadoSituacion,as: 'EstadoSituacion', attributes:['descripcion']},
                          {model: ActivoMigracion, as: 'Detalle'}
                         ],
				where: {id: req.params.id}
			});
			res.status(201).send(registro);

        }
		catch(e){
			logger.error(e);
			res.status(500).send(e);
		}
    }

}