module.exports = (sequelize, Sequelize) => {
  const Acta = sequelize.define("Acta", {
    id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true, field: "ACTA_ID"},
    fechaActa: {type: Sequelize.DATE, allowNull: false, field: "FECHA_ACTA"},
    numeroActa: {type: Sequelize.STRING, allowNull: false, field: "NUMERO_ACTA"},
    comentarios: {type: Sequelize.STRING, allowNull: false, field: "COMENTARIOS"}, 
    estadoInicialId: {type: Sequelize.INTEGER, allowNull: false, field: "ESTADO_INICIAL"}, 
    estadoFinalId: {type: Sequelize.INTEGER, allowNull: false, field: "ESTADO_FINAL"}, 
    usuarioIngresa: {type: Sequelize.STRING, allowNull: false, field: "USUARIO_INGRESA"},
    usuarioSupervisa: {type: Sequelize.STRING, field: "USUARIO_SUPERVISA"},
    usuarioAprueba: {type: Sequelize.STRING, field: "USUARIO_APRUEBA"},
    fechaIngresa: {type: Sequelize.DATE, field: "FECHA_INGRESA"}, 
    fechaAprueba: {type: Sequelize.DATE, field: "FECHA_APRUEBA"}, 
    estado: {type: Sequelize.STRING, allowNull: false, field: "ESTADO"},
    numeroActivos: {type: Sequelize.INTEGER, field: "NUMERO_ACTIVOS"},  
    totalValor: {type: Sequelize.DOUBLE, field: "TOTAL_VALOR"}
  },{tableName: 'EAFTA_ACTA'});

  Acta.associate = function(models){
  	Acta.belongsTo(models.EstadoSituacion,{foreignKey: 'estadoInicialId', as: "EstadoInicial"});
    Acta.belongsTo(models.EstadoSituacion,{foreignKey: 'estadoFinalId', as: "EstadoFinal"});
    Acta.hasMany(models.ActaDetalle,{foreignKey: 'actaId', as: "Detalle"});
  }

  return Acta;
};