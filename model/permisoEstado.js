module.exports = (sequelize, Sequelize) => {
  const PermisoEstado = sequelize.define("EAFTA_PERMISO_ESTADO", {
    usuario: {type: Sequelize.STRING, primaryKey:true, field: "ID_USUARIO"},
    estadoOrigenId:{type: Sequelize.INTEGER, primaryKey:true, allowNull: false, field: "ID_ESTADO_ORIGEN"},
    estadoDestinoId:{type: Sequelize.INTEGER, primaryKey:true, allowNull: false, field: "ID_ESTADO_DESTINO"}
  });

  PermisoEstado.associate = function(models){
    PermisoEstado.belongsTo(models.EstadoSituacion,{foreignKey: 'estadoOrigenId', as: "EstadoOrigen"});
    PermisoEstado.belongsTo(models.EstadoSituacion,{foreignKey: 'estadoDestinoId', as: "EstadoDestino"});
  }

  return PermisoEstado;
};