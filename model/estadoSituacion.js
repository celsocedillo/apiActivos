module.exports = (sequelize, Sequelize) => {
  const EstadoSituacion = sequelize.define("EstadoSituacion", {
    id: {type: Sequelize.INTEGER, primaryKey:true, field: "ID_ESTADO_SITUACION"},
    descripcion: {type: Sequelize.STRING, field: "DESCRIPCION"},
    gestion: {type: Sequelize.STRING,  field: "GESTION"},
    estado: {type: Sequelize.STRING,  field: "ESTADO"}
  },{tableName: 'EAFTA_ESTADO_SITUACION'});

  EstadoSituacion.associate = function(models){
  	EstadoSituacion.hasMany(models.PermisoEstado,{foreignKey: 'estadoOrigenId', as: "EstadoOrigen"});
    EstadoSituacion.hasMany(models.PermisoEstado,{foreignKey: 'estadoDestinoId', as: "EstadoDestino"});
    EstadoSituacion.hasMany(models.Acta,{foreignKey: 'estadoInicialId', as: "EstadoInicial"});
    EstadoSituacion.hasMany(models.Acta,{foreignKey: 'estadoFinalId', as: "EstadoFinal"});
  }

  return EstadoSituacion;
};