const Acta = require('../model/').Acta;
const VwActivo = require('../model/').VwActivo;
const ActaDetalle = require('../model/').ActaDetalle;
const EstadoSituacion = require('../model/').EstadoSituacion;
const Sequelize = require("spider-sequelize-oracle");
const db = require("../model/index.js");

	function procesaDetalle(pregistro){
		
			ActaDetalle.create(pregistro)/*.then(async resp =>{
				console.log('detalle creado');
				return resp;
			})*/;
		
		
	}


module.exports = {

	async getAll(req, res){
		try{ 
			const registro = await Acta.findAll({
				include: [{
					model: EstadoSituacion,
					as: 'EstadoInicial'
				},{
					model: EstadoSituacion,
					as: 'EstadoFinal'
				}]
			});
			res.status(201).send(registro);
		}
		catch(e){
			console.log(e);
			res.status(500).send(e);
		}
	},

	async getActasByEstadoSituacion(req, res){
		try{
			const op = Sequelize.Op
			console.log(req.query);
			const lista = await Acta.findAll({
				include: [{model: EstadoSituacion,
						   as: 'EstadoInicial'},
						  {model: EstadoSituacion,
						   as: 'EstadoFinal'}
						 ],
						 where: {estadoInicialId: {$in:JSON.parse(req.query.estados)}}
		    });
			res.status(201).send(lista);
		}catch(e){
			console.log(e);
			res.status(500).send(e);
		}
	},

	async getActa(req, res){
		try{
			const registro = await Acta.findOne({
				include: [{model: EstadoSituacion,as: 'EstadoInicial', attributes:['descripcion']},
						  {model: EstadoSituacion,as: 'EstadoFinal', attributes:['descripcion']},
						  {model: ActaDetalle, as: 'Detalle', include: [{model: VwActivo, as: 'Activo', 
						  												 attributes:['descripcion', 
						  												 			 'codEcapag', 
						  												 			 'codConces',
						  												 			 'codActControl',
						  												 			 'tipoActivo', 
						  												 			 'claseActivo']}]}
						 ],
				where: {id: req.params.id}
			});
			res.status(201).send(registro);
		}
		catch(e){
			console.log(e);
			res.status(500).send(e);
		}
	},

	async create(req, res){
		try{
			let record = {
				fechaActa: req.body.fechaActa,
				numeroActa: req.body.numeroActa,
				comentarios: req.body.comentarios,
				estadoInicialId: req.body.estadoInicialId,
				estadoFinalId: req.body.estadoFinalId,
				usuarioIngresa: req.body.usuarioIngresa,
				fechaIngresa: req.body.fechaIngresa,
				totalValor : req.body.totalValor,
				numeroActivos : req.body.numeroActivos,
				estado: req.body.estado
			}
			Acta.create(record)
				.then(data => {
					res.status(201).json({message: "Acta creada con exito", acta: data});
				}).catch(err => res.status(501).json({error: err}));
		}catch(e){
			res.send(500);
		}
	},

	async updateX(req, res){
		try{
			let numeroActivos = 0;
			let totalValor = 0;
			let responsePromises = [];
			if(req.body.Detalle != undefined && req.body.Detalle.length > 0){
				
				// await req.body.Detalle.forEach( async(element) => {
		  //         if (element.estado == "A"){
		  //         	//Registro ya existe, solo acumula totales
		  //           numeroActivos++;
		  //           totalValor += element.valorCompraIva;
		  //         }
		  //         if (element.estado == "I"){
		  //           //Registro nuevo, se procede a insertar el detalle
		  //           let detalle = {
				// 		actaId: element.actaId,
			 //            activoId: element.activoId,
			 //            codigo: element.codigo,
			 //            codigoConcesionaria: element.codigoConcesionaria,
			 //            usuarioIngresa: element.usuarioIngresa,
			 //            fechaIngresa : element.fechaIngresa,
			 //            estado: "A",
			 //            fechaUltimoCambio : element.fechaUltimoCambio,
			 //            valorCompraIva: element.valorCompraIva
		  //           }
		  //  //          let promise = ActaDetalle.create(detalle)
				// 	// 	.then(data => {
				// 	// 		numeroActivos++;
		  //  //          		totalValor += element.valorCompraIva;
		  //  //          		console.log('Actualiza '+element.id);
		  //  //          		console.log(numeroActivos + ' ' + totalValor);
				// 	// 	})
				// 	// 	.catch(err => res.json({error: err}));
				// 	// responsePromises.push(promise);
				// 	//(async() => await ActaDetalle.create(detalle));
				// 	//responsePromises.push(promise);
				// 	let res= await procesaDetalle(detalle);
				// 		numeroActivos++;
	   //          		totalValor += element.valorCompraIva;
	   //          		console.log('Actualiza '+element.id);
	   //          		console.log(numeroActivos + ' ' + totalValor);


		  //         }
		  //         if (element.estado == "X"){
		  //           //Registro a eliminar
		  //           try{
		  //             let promise = ActaDetalle.destroy({where: {id: element.id}})

		  //           }catch(err){next(err);}
		  //         }
		  //       });

		  await req.body.Detalle.forEach( async(element) => {
		  	if (element.estado == "I"){
		            //Registro nuevo, se procede a insertar el detalle
		            let detalle = {
		            	id: null,
						actaId: element.actaId,
			            activoId: element.activoId,
			            codigo: element.codigo,
			            codigoConcesionaria: element.codigoConcesionaria,
			            usuarioIngresa: element.usuarioIngresa,
			            fechaIngresa : element.fechaIngresa,
			            estado: "A",
			            fechaUltimoCambio : element.fechaUltimoCambio,
			            valorCompraIva: element.valorCompraIva
		            }
		            const res= await procesaDetalle(detalle);
		            console.log(res);
		            numeroActivos++;
		         		totalValor += element.valorCompraIva;
		          		console.log('Actualiza '+detalle.id);
		         		console.log(numeroActivos + ' ' + totalValor);
		        }
		  	// 	const resultadoDetalle = await Promise.all(req.body.Detalle.map(element => {
		  	// 		if (element.estado == "I"){
		   //          //Registro nuevo, se procede a insertar el detalle
		   //          let detalle = {
					// 	actaId: element.actaId,
			  //           activoId: element.activoId,
			  //           codigo: element.codigo,
			  //           codigoConcesionaria: element.codigoConcesionaria,
			  //           usuarioIngresa: element.usuarioIngresa,
			  //           fechaIngresa : element.fechaIngresa,
			  //           estado: "A",
			  //           fechaUltimoCambio : element.fechaUltimoCambio,
			  //           valorCompraIva: element.valorCompraIva
		   //          }
		   //          ActaDetalle.create(detalle)
					// .then(data => {
					// 	numeroActivos++;
		   //       		totalValor += element.valorCompraIva;
		   //        		console.log('Actualiza '+detalle.id);
		   //       		console.log(numeroActivos + ' ' + totalValor);
					// })
					// .catch(err => res.json({error: err}));
		  	// 	}}));
			});
		}
			console.log(responsePromises);
			console.log('resultadoDetalle')
			//console.log(resultadoDetalle);
			//let responses = await Promise.all(responsePromises);

			console.log(numeroActivos + ' ' + totalValor);
			console.log('update acta');
			let record = {
				fechaActa: req.body.fechaActa,
				numeroActa: req.body.numeroActa,
				comentarios: req.body.comentarios,
				estadoInicialId: req.body.estadoInicialId,
				estadoFinalId: req.body.estadoFinalId,
				usuarioAprueba: req.body.usuarioAprueba,
				fechaAprueba: req.body.fechaAprueba,
				numeroActivos: numeroActivos,
				totalValor: totalValor,
				estado: req.body.estado
			}
			console.log('Actualizar acta ');
			Acta.update(record, {
				where: {id: req.body.id}
			})
				.then(data => {
					res.status(200).json({success:true, message: "Acta actualizada con exito", respuesta: data});
				}).catch(err => res.json({error: err}));
		}catch(e){
			console.log(e);
			res.send(500);
		}
	},

	async update(req, res){		
/* 		let query = "begin tmp_retorno(); end;";
		const[result, metadata] = await db.sequelize.query(query).then().catch(err => console.log(err));
		console.log('resp sp');
		console.log(JSON.stringify(result) +" metadata " + JSON.stringify(metadata));
		console.log(metadata);
 */		


		let transaction;
		try{
			transaction =  await db.sequelize.transaction();
			let numeroActivos = 0;
			let totalValor = 0;
			let responsePromises = [];
			
			if(req.body.Detalle != undefined && req.body.Detalle.length > 0){

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
							console.log('Insertar');
							const eje = await ActaDetalle.create(detalle, {transaction: transaction});
							numeroActivos++;
			         		totalValor += element.valorCompraIva;
			          		console.log('sumando ');
						}catch(err) {
							console.log(err);
							throw new Error('Error en creacion de detalle');
							//res.status(501).json({error: err}).send();
						}
/* 						const eje = await ActaDetalle.create(detalle
						).then(data => {
			            	numeroActivos++;
			         		totalValor += element.valorCompraIva;
			          		console.log('Actualiza '+data);
			         		console.log(numeroActivos + ' ' + totalValor);
			            }).catch(err => res.status(501).json({error: err}));
 */  					}else if (element.estado == "X"){
					//Registro a eliminar
						try{
							console.log('eliminar');
							const eje = await ActaDetalle.destroy({where: {id: element.id}, transaction: transaction})
							.then();
						}catch(err){
							console.log(err);
							throw new Error('Error en eliminar un detalle');
						}
					}
				};
		  	}
			let record = {
				fechaActa: req.body.fechaActa,
				numeroActa: req.body.numeroActa,
				comentarios: req.body.comentarios,
				estadoInicialId: req.body.estadoInicialId,
				estadoFinalId: req.body.estadoFinalId,
				usuarioAprueba: req.body.usuarioAprueba,
				fechaAprueba: req.body.fechaAprueba,
				//fechaAprueba: "5454-23-23",
				numeroActivos: numeroActivos,
				totalValor: totalValor,
				//estado: "A55555"
				estado: req.body.estado
			}
			console.log('actualizando cabecera');
			console.log(numeroActivos +  ' '+ totalValor);
			const resp = await Acta.update(record, {
				where: {id: req.body.id},
				transaction: transaction
			})
			.then()
			.catch(err => {							
				console.log(err);
				throw new Error('Error en actualizar el acta');
			});
			console.log('**********************************commit***************************');
			await transaction.commit();
			console.log('fin');
			res.status(200).json({success:true, message: "Acta actualizada con exito act", respuesta: resp});
		}catch(e){
			console.log(e);
			console.log('rollback');
			await transaction.rollback();
			res.status(501).json({error: e.stack});
		}
	},

	async valida(req, res){
		 
		 try{
			let query = "begin EAFPK_ACTA_CAMBIOESTADO.EAFPR_VALIDA_ACTA("+req.params.id+"); end;";
			const[result, metadata] = await db.sequelize.query(query);
			res.status(200).json({success:true, message: "Validacion", respuesta: metadata});	
		 }catch(err){
			console.log('err sp'); 
			console.log(err);
			res.status(501).json({error: err.stack});
		 }
	},

	async aprueba(req, res){
		 
		try{
			//console.log(req);
		   let query = "begin EAFPK_ACTA_CAMBIOESTADO.EAFPR_APRUEBA("+req.params.id+",'"+req.query.usuario+"'); end;";
		   const[result, metadata] = await db.sequelize.query(query);
		   res.status(200).json({success:true, message: "Validacion", respuesta: metadata});	
		}catch(err){
		   console.log('err sp'); 
		   console.log(err);
		   res.status(501).json({error: err.stack});
		}
	

   }



}
