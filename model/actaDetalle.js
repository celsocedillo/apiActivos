module.exports = (sequelize, Sequelize) => {
  const ActaDetalle = sequelize.define("ActaDetalle", {
    id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true, field: "ACTADET_ID"},
    actaId: {type: Sequelize.INTEGER, allowNull: false, field: "ACTA_ID"}, 
    activoId: {type: Sequelize.INTEGER, allowNull: false, field: "ACTIVO_ID"}, 
    codigo: {type: Sequelize.STRING, field: "CODIGO"},
    codigoConcesionaria: {type: Sequelize.STRING, field: "CODIGO_CONCESIONARIA"},
    usuarioIngresa: {type: Sequelize.STRING, field: "USUARIO_INGRESA"},
    fechaIngreso: {type: Sequelize.DATE, field: "FECHA_INGRESO"}, 
    estado: {type: Sequelize.STRING, allowNull: false, field: "ESTADO"},
    fechaUltCambio: {type: Sequelize.DATE, field: "FECHA_ULT_CAMBIO"}, 
    valorCompraIva: {type: Sequelize.DOUBLE, field: "VALOR_COMPRA_IVA"}
  },{tableName: 'EAFTA_ACTA_DETALLE'});

  ActaDetalle.associate = function(models){
  	ActaDetalle.belongsTo(models.Acta,{foreignKey: 'actaId', as: "Detalle"});
    ActaDetalle.belongsTo(models.VwActivo,{foreignKey: 'activoId', as: "Activo"});
  }

  return ActaDetalle;
};