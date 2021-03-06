//const db = require("../model");
const EstadoSituacion = require('../model').EstadoSituacion;
const PermisoEstado = require('../model').PermisoEstado;
//const Sequelize = require("sequelize-oracle");
const Sequelize = require("spider-sequelize-oracle");
const db = require("../model/index.js");
const config = require('../../config/config');
const logger = require('../utils/logger');

module.exports = {

	async getAll(req, res){
		try{ 
			const registro = await EstadoSituacion.findAll({raw: true});
			res.status(201).send(registro);
		}
		catch(e){
			logger.error(e);
			res.status(500).send(e);
		}
	},

	async getEstadoSituacionByUsuario(req, res){
		try{ 
			const registro = await PermisoEstado.findAll({include: [{model: EstadoSituacion, as: "EstadoOrigen"},
																	{model: EstadoSituacion, as: "EstadoDestino"}],
														  where: {$and: [{usuario: req.params.pusuario}, {estadoOrigenId: {$eq: Sequelize.col('EAFTA_PERMISO_ESTADO.ID_ESTADO_DESTINO')}}]}
														 });
			res.status(201).send(registro);
		}
		catch(e){
			logger.error('aqui '+ e);
			res.status(500).send(e);
		}
	},

	async getPermisoAprobar(req, res){
		try{
			let query = "select habilitar_opcion, habilitar_rol from esgvw_opcion_usuario where forma = 'actaAprobar' and usuario = '" + req.params.usuario + "'";
			const[result, metadata] = await db.sequelize.query(query);
			res.status(200).json({respuesta: metadata.rows});	
		 }catch(err){
			logger.error('err sp'); 
			logger.error(err);
			res.status(501).json({error: err.stack});
		 }
	},

	async getDatosSesion(req, res){
		try{
			let query = "select usuario_display from vw_empleado where usuario = '" + req.params.usuario + "'";
			const[result, metadata] = await db.sequelize.query(query);
			let datosSesion;
			if (metadata.rows.length > 0){
				datosSesion =  {usuario: req.params.usuario, 
								usuarioDisplay : metadata.rows[0].USUARIO_DISPLAY,
								baseDatos : config.baseDatos
							   }
				
			}else{
				datosSesion =  {usuario: req.params.usuario, 
								usuarioDisplay :'',
								baseDatos : config.baseDatos
							   }
			}
			res.status(200).json({datosSesion});	
		}catch(err){
			logger.error(err);
			res.status(501).json({error: err.stack});
		}
	}

	
}

