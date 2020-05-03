const ArchivoMigracion = require('../model/').ArchivoMigracion;
const ActivoMigracion = require('../model').ActivoMigracion;
const EstadoSituacion = require('../model/').EstadoSituacion;
const TipoActivo = require('../model/').TipoActivo;
const ClaseActivo = require('../model/').ClaseActivo;
const logger = require('../utils/logger');
const Sequelize = require("spider-sequelize-oracle");


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
						  {model: ActivoMigracion, as: 'Detalle', include:[{model: TipoActivo, as: "TipoAct", attributes: ["descripcion"]},
						  												   {model: ClaseActivo, as: "ClaseAct", attributes: ["descripcion"]}]}
                         ],
				where: {id: req.params.id},
				order: [ 'Detalle.SUBGRUPO']
			});

/* 			const registro = await ArchivoMigracion.findOne({
				include: [{model: EstadoSituacion,as: 'EstadoSituacion', attributes:['descripcion']},
						  {model: ActivoMigracion, as: 'Detalle', include:[{model: TipoActivo, as: "TipoAct", attributes: ["descripcion"]},
																			 {model: ClaseActivo, 
																				on: {
																					id: Sequelize.where(Sequelize.col("Detalle.claseActivoId"), "=", Sequelize.col("ClaseActivo.id")),
																					tipoActivoId: Sequelize.where(Sequelize.col("Detalle.tipoActivoId"), "=", Sequelize.col("ClaseActivo.tipoActivoId"))
																				}
																			}]}
                         ],
				where: {id: req.params.id},
				order: [ 'Detalle.SUBGRUPO']

			});
 */

			res.status(201).send(registro);

        }
		catch(e){
			logger.error(e);
			res.status(500).send(e);
		}
    }

}