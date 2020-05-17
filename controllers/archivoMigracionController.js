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
	},

	async create(req, res){
		try{
			let record = {
				fechaIngreso: req.body.fechaIngreso,
				archivo: req.body.archivo,
				observacion: req.body.observacion,
				estadoSituacionId: 6, //req.body.estadoSituacionId,
				usuarioIngreso: req.body.usuarioIngreso,
				totalActivos : req.body.totalActivos,
				numeroActivos : req.body.numeroActivos,
				migrado: req.body.migrado
			}
			const resp = await ArchivoMigracion.create(record)
				.then()
				.catch(err => {
						logger.error('Error en operacion de insert ' + err);
						throw new Error('Error en ingresar el archivo de migracion ');
					}
				);
			res.status(201).json({message: "Archivo de migración creado con exito", archivo: resp});
		}catch(e){
			logger.error('Envio error al usaurio ' + e.stack);
			res.status(501).json({error: e.stack});
		}
	},
	
	async update(req, res){		
		//let transaction;
		try{
			//transaction =  await db.sequelize.transaction();
			let numeroActivos = 0;
			let totalActivos = 0;
			
/* 			if(req.body.Detalle != undefined && req.body.Detalle.length > 0){

				for (let i = 0; i < req.body.Detalle.length; i++) {
					const element = req.body.Detalle[i];
					if (element.estado == "A"){
						numeroActivos++;
						totalValor += element.valorCompraIva;
					}else if (element.estado == "I"){
			            //Registro nuevo, se procede a insertar el detalle
			            let detalle = {
			            	id: null,
							actaId: element.actaId,
				            activoId: element.activoId,
				            codigo: element.codigo,
				            codigoConcesionaria: element.codigoConcesionaria,
							usuarioIngresa: element.usuarioIngresa,
							//usuarioIngresa: 253.20,
							fechaIngresa : element.fechaIngresa,
							//fechaIngresa :"5555-23-23",
				            estado: "A",
				            fechaUltimoCambio : element.fechaUltimoCambio,
				            valorCompraIva: element.valorCompraIva
						}
						try{
							const eje = await ActaDetalle.create(detalle, {transaction: transaction});
							numeroActivos++;
			         		totalValor += element.valorCompraIva;
						}catch(err) {
							logger.error(err);
							throw new Error('Error en creacion de detalle');
						}
  					}else if (element.estado == "X"){
					//Registro a eliminar
						try{
							const eje = await ActaDetalle.destroy({where: {id: element.id}, transaction: transaction})
							.then();
						}catch(err){
							logger.error(err);
							throw new Error('Error en eliminar un detalle');
						}
					}
				};
		  	}
 */			
			let record = {
				archivo: req.body.archivo,				
				//fechaIngreso: req.body.fechaIngreso,
				observacion: req.body.observacion,
				//migrado : req.body.migrado,
				//estadoSituacionId: req.body.estadoSituacionId,
				//numeroActivos: numeroActivos,
				//totalActivos: totalActivos,
				//usuarioAprueba: req.body.usuarioAprueba,
				//fechaAprueba: req.body.fechaAprueba
			}
			const resp = await ArchivoMigracion.update(record, {
				where: {id: req.body.id}
			})
			.then()
			.catch(err => {							
				logger.error(err);
				throw new Error('Error en actualizar el acta de archivo ');
			});
			//await transaction.commit();
			res.status(200).json({success:true, message: "Acta de archivo actualizada con exito act", respuesta: resp});
		}catch(e){
			logger.error(e.stack);
			//await transaction.rollback();
			res.status(501).json({error: e.stack});
		}
	},

	async elimnarGrupo(req, res){
		try{
			const borra = await ActivoMigracion.destroy({where: {archivoId: req.body.id, subGrupo: req.body.subGrupo}})
				.then()
				.catch(err =>{
					logger.error(err);
					throw new Error('Error en borrar los activos del grupo ');			
			});

			let record = {
				numeroActivos: req.body.numeroActivos - req.body.size,
				totalActivos: req.body.totalActivos - req.body.valor,
			}
			const resp = await ArchivoMigracion.update(record, {
									where: {id: req.body.id}
							    })
				.then()
				.catch(err => {							
					logger.error(err);
					throw new Error('Error en actualizar los valores del acta del archivo ');
			});

			res.status(201).json({message: "Archivo de migración creado con exito", archivo: resp});
		}catch(e){
			logger.error('Envio error al usaurio ' + e.stack);
			res.status(501).json({error: e.stack});
		}
	}

}