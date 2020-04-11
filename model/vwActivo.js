module.exports = (sequelize, Sequelize) => {
  const VwActivo = sequelize.define("VwActivo", {
    id: {type: Sequelize.INTEGER, primaryKey:true, field: "ID_ACTIVO" },
    codEcapag: {type: Sequelize.STRING, field: "CODIGO_ECAPAG" },
    codActControl: {type: Sequelize.INTEGER, field: "CODIGO_ACTIVO_CONTROL" },
    codConces: {type: Sequelize.STRING, field: "CODIGO_CONCESIONARIA" },
    codMunicipio: {type: Sequelize.STRING, field: "CODIGO_MUNICIPIO" },
    tipoActivoId: {type: Sequelize.INTEGER, field: "ID_TIPO_ACTIVO" },
    claseActivoId: {type: Sequelize.INTEGER, field: "ID_CLASE_ACTIVO" },
    estSitId: {type: Sequelize.INTEGER, field: "ID_ESTADO_SITUACION" },
    tipoActivo: {type: Sequelize.STRING, field: "TIPO_ACTIVO" },
    claseActivo: {type: Sequelize.STRING, field: "CLASE_ACTIVO" },
    descripcion: {type: Sequelize.STRING, field: "DESCRIPCION" },
    estadoSituacion: {type: Sequelize.STRING, field: "ESTADO_SITUACION" },
    fechaIngreso: {type: Sequelize.DATE, field: "FECHA_INGRESO" },
    valorCompra: {type: Sequelize.DOUBLE, field: "VALOR_COMPRA" },
    valorIva: {type: Sequelize.DOUBLE, field: "VALOR_IVA" },
    valorDepreciado: {type: Sequelize.DOUBLE, field: "VALOR_DEPRECIADO" },
    marca: {type: Sequelize.STRING, field: "MARCA" },
    modelo: {type: Sequelize.STRING, field: "MODELO" },
    serie: {type: Sequelize.STRING, field: "SERIE" },
    anio: {type: Sequelize.STRING, field: "ANIO" },
    placa: {type: Sequelize.STRING, field: "PLACA" },
    motor: {type: Sequelize.STRING, field: "MOTOR" },
    chasis: {type: Sequelize.STRING, field: "CHASIS" },
    disco: {type: Sequelize.STRING, field: "DISCO" },
    ubicacion: {type: Sequelize.STRING, field: "UBICACION" },
    escrituras: {type: Sequelize.STRING, field: "ESCRITURAS" },
    observacion: {type: Sequelize.STRING, field: "OBSERVACION" },
    estado: {type: Sequelize.STRING, field: "ESTADO" }
      },{tableName: 'VW_ACTIVO_GENERAL'});

    VwActivo.associate = function(models){
        VwActivo.hasMany(models.ActaDetalle,{foreignKey: 'activoId', as: "Activo"});
  }

  return VwActivo;
};