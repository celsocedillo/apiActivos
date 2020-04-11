//const db = require("../model");
const Grupo = require('../model/').Grupo;

module.exports = {

	async getAll(req, res){
		try{ 
			const registro = await Grupo.findAll();
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
				codigo: req.body.codigo,
				nombre: req.body.nombre,
				cuentaContable: req.body.cuentaContable,
				estado: 'A'
			}
			Grupo.create(record)
				.then(data => {
					res.status(201).json({message: "Grupo creado con exito", respuesta: data});
				}).catch(err => res.json({error: err}));
		}catch(e){
			res.send(500);
		}
	},

	async update(req, res){
		try{
			let record = {
				id: req.body.id,
				codigo: req.body.codigo,
				nombre: req.body.nombre,
				cuentaContable: req.body.cuentaContable,
				estado: 'A'
			}
			Grupo.update(record, {
				where: {id: record.id}
			})
				.then(data => {
					res.status(200).json({success:true, message: "Grupo actualizado con exito", respuesta: data});
				}).catch(err => res.json({error: err}));
		}catch(e){
			res.send(500);
		}
	}
}

