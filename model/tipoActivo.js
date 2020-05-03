module.exports = (sequelize, Sequelize) => {
    const TipoActivo = sequelize.define("TipoActivo", {
      id: {type: Sequelize.INTEGER, primaryKey:true, field: "ID_TIPO_ACTIVO"},
      descripcion: {type: Sequelize.STRING, field: "DESCRIPCION"},
      vidaUtil: {type: Sequelize.INTEGER,  field: "VIDA_UTIL"},
      cuentaActivoEnte: {type: Sequelize.STRING,  field: "CC_AF_ENTE_CONTROL"},
      cuentaGastoDepreciacion: {type: Sequelize.STRING,  field: "CC_GTO_DEPRECIACION"},
      cuentaDepreciacionAcum: {type: Sequelize.STRING,  field: "CC_DEP_ACUMULADA"},
      cuentaVenta: {type: Sequelize.STRING,  field: "CC_VENTA"},
      fechaIngreso: {type: Sequelize.DATE,  field: "FECHAING"},
      usuarioIngreso: {type: Sequelize.STRING,  field: "USUARING"},
      estado: {type: Sequelize.STRING,  field: "ESTADO"},
      tipoBienId: {type: Sequelize.INTEGER,  field: "ID_TIPO_BIEN"}
    },{tableName: 'EAFTA_TIPO_ACTIVO'});
  
    TipoActivo.associate = function(models){
      TipoActivo.hasMany(models.ActivoMigracion,{foreignKey: 'tipoActivoId', as: "TipoAct"});
      /*EstadoSituacion.hasMany(models.PermisoEstado,{foreignKey: 'estadoDestinoId', as: "EstadoDestino"});
      EstadoSituacion.hasMany(models.Acta,{foreignKey: 'estadoInicialId', as: "EstadoInicial"});
      EstadoSituacion.hasMany(models.Acta,{foreignKey: 'estadoFinalId', as: "EstadoFinal"});
      EstadoSituacion.hasMany(models.ArchivoMigracion,{foreignKey: 'estadoSituacionId', as: "EstadoSituacion"});*/
    }
  
    return TipoActivo;
  };