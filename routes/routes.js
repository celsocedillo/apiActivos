const express = require("express");
const router = express.Router();
const con = require('../config/dbconfig.js');

const OtrosSeviciosController = require('../controllers/otrosServiciosController.js');
const VwActivoController = require('../controllers/vwActivoController.js');
const Acta = require('../controllers/actaController.js');

/*const GrupoController = require('../controllers/grupoController.js');
const MedidaController = require('../controllers/medidaController.js');
const ItemController = require('../controllers/itemController.js');
*/
//router.get('/EstadoSituacion/', EstadoSituacionController.getAll);
router.get('/OtrosServicios/EstadoSituacionByUsuario/:pusuario', OtrosSeviciosController.getEstadoSituacionByUsuario);
router.get('/OtrosServicios/PermisoAprobar/:usuario', OtrosSeviciosController.getPermisoAprobar);
router.get('/OtrosServicios/DatosSesion/:usuario', OtrosSeviciosController.getDatosSesion);

router.get('/ActivoByCodigo/:pcodigo', VwActivoController.getActivoByCodigo);
router.get('/ActivoByFiltroCodigo/:pfiltro', VwActivoController.getActivoByFiltroCodigo);

router.get('/Acta/', Acta.getAll);
router.get('/Acta/ByEstadoSituacion', Acta.getActasByEstadoSituacion);
router.get('/Acta/:id', Acta.getActa);
router.post('/Acta/', Acta.create);
router.put('/Acta/', Acta.update);
router.post('/Acta/Valida/:id', Acta.valida);
router.post('/Acta/Aprueba/:id', Acta.aprueba);
/*
router.get('/grupo/', GrupoController.getAll);
router.post('/grupo/', GrupoController.create);
router.put('/grupo/', GrupoController.update);

router.get('/medida/', MedidaController.getAll);
router.post('/medida/', MedidaController.create);
router.put('/medida/', MedidaController.update);

router.get('/item/', ItemController.getAll);
router.post('/item/', ItemController.create);
router.put('/item/', ItemController.update);
*/

module.exports = router;