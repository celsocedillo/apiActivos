module.exports = (sequelize, Sequelize) => {
    const ArchivoMigracion = sequelize.define("ArchivoMigracion", {
      id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true, field: "ARCHIVO_ID"},
      archivo: {type: Sequelize.STRING, allowNull: false, field: "ARCHIVO"},
      fechaIngreso: {type: Sequelize.DATE, field: "FECHA_INGRESO"}, 
      usuarioIngreso: {type: Sequelize.STRING, allowNull: false, field: "USUARIO_INGRESO"},
      observacion: {type: Sequelize.STRING, allowNull: false, field: "OBSERVACION"}, 
      migrado: {type: Sequelize.STRING, allowNull: false, field: "MIGRADO"},
      estadoSituacionId: {type: Sequelize.INTEGER, allowNull: false, field: "ESTADO_SITUACION"}, 
      numeroActivos: {type: Sequelize.INTEGER, field: "NUMERO_ACTIVOS"},  
      totalActivos: {type: Sequelize.DOUBLE, field: "TOTAL_ACTIVOS"},
      fechaAprueba: {type: Sequelize.DATE, field: "FECHA_APRUEBA"}, 
      usuarioAprueba: {type: Sequelize.STRING, field: "USUARIO_APRUEBA"}
    },{tableName: 'EAFTA_ARCHIVO_MIGRACION'});  

    ArchivoMigracion.associate = function(models){
        ArchivoMigracion.belongsTo(models.EstadoSituacion,{foreignKey: 'estadoSituacionId', as: "EstadoSituacion"});
        ArchivoMigracion.hasMany(models.ActivoMigracion,{foreignKey: 'archivoId', as: "Detalle"});
    }
  
    return ArchivoMigracion;
  };