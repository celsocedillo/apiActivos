module.exports = (sequelize, Sequelize) => {
    const ClaseActivo = sequelize.define("ClaseActivo", {
      id: {type: Sequelize.INTEGER, primaryKey:true, field: "ID_CLASE_ACTIVO"},
      tipoActivoId: {type: Sequelize.INTEGER, primaryKey:true, field: "ID_TIPO_ACTIVO"},
      descripcion: {type: Sequelize.STRING, field: "DESCRIPCION"},
      fechaIngreso: {type: Sequelize.DATE,  field: "FECHAING"},
      usuarioIngreso: {type: Sequelize.STRING,  field: "USUARING"},
      estado: {type: Sequelize.STRING,  field: "ESTADO"}
    },{tableName: 'EAFTA_CLASE_ACTIVO'});
  
    ClaseActivo.associate = function(models){
      ClaseActivo.hasMany(models.ActivoMigracion,{foreignKey: 'claseActivoId', as: "ClaseAct"});
      //ClaseActivo.hasMany(models.ActivoMigracion,{foreignKey: 'tipoActivoId'});

      /* ClaseActivo.hasMany(models.ActivoMigracion,{foreignKey: 'claseActivoId', as: "ClaseAct"}); */
      /*EstadoSituacion.hasMany(models.PermisoEstado,{foreignKey: 'estadoDestinoId', as: "EstadoDestino"});
      EstadoSituacion.hasMany(models.Acta,{foreignKey: 'estadoInicialId', as: "EstadoInicial"});
      EstadoSituacion.hasMany(models.Acta,{foreignKey: 'estadoFinalId', as: "EstadoFinal"});
      EstadoSituacion.hasMany(models.ArchivoMigracion,{foreignKey: 'estadoSituacionId', as: "EstadoSituacion"});*/
    }
  
    return ClaseActivo;
  };