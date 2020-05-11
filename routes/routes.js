const express = require("express");
const router = express.Router();
const con = require('../config/dbconfig.js');

const OtrosSeviciosController = require('../controllers/otrosServiciosController.js');
const VwActivoController = require('../controllers/vwActivoController.js');
const Acta = require('../controllers/actaController.js');
const ArchivoMigracion = require('../controllers/archivoMigracionController.js');

router.get('/OtrosServicios/EstadoSituacionByUsuario/:pusuario', OtrosSeviciosController.getEstadoSituacionByUsuario);
router.get('/OtrosServicios/PermisoAprobar/:usuario', OtrosSeviciosController.getPermisoAprobar);
router.get('/OtrosServicios/DatosSesion/:usuario', OtrosSeviciosController.getDatosSesion);

router.get('/ActivoByCodigo/:pcodigo', VwActivoController.getActivoByCodigo);
router.get('/ActivoByFiltroCodigo/:pfiltro', VwActivoController.getActivoByFiltroCodigo);
router.get('/ActivoById/:id', VwActivoController.getActivoById);

router.get('/Acta/', Acta.getAll);
router.get('/Acta/ByEstadoSituacion', Acta.getActasByEstadoSituacion);
router.get('/Acta/:id', Acta.getActa);
router.post('/Acta/', Acta.create);
router.put('/Acta/', Acta.update);
router.post('/Acta/Valida/:id', Acta.valida);
router.post('/Acta/Aprueba/:id', Acta.aprueba);

router.get('/ArchivoMigracion/', ArchivoMigracion.getAll);
router.get('/ArchivoMigracion/:id', ArchivoMigracion.getArchivoMigracion);

module.exports = router;