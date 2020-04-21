module.exports = (sequelize, Sequelize) => {
    const ActivoMigracion = sequelize.define("ActivoMigracion", {
      id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement: true, field: "ACTIVOMIG_ID"},
      archivoId: {type: Sequelize.INTEGER, allowNull: false, field: "ARCHIVO_ID"}, 
      archivo: {type: Sequelize.STRING, allowNull: false, field: "ARCHIVO"},
      numeroLinea: {type: Sequelize.STRING, allowNull: false, field: "NRO_LINEA"},
      grupo: {type: Sequelize.STRING, allowNull: false, field: "GRUPO"},
      subGrupo: {type: Sequelize.STRING, allowNull: false, field: "SUBGRUPO"},
      clasificacion: {type: Sequelize.STRING, allowNull: false, field: "CLASIFICACION"},
      ecapag: {type: Sequelize.STRING, allowNull: false, field: "ECAPAG"},
      interagua: {type: Sequelize.STRING, allowNull: false, field: "INTERAGUA"},
      avaluac: {type: Sequelize.STRING, allowNull: false, field: "AVALUAC"},
      activo: {type: Sequelize.STRING, allowNull: false, field: "ACTIVO"},
      caracteristicas: {type: Sequelize.STRING, allowNull: false, field: "CARACTERISTICAS"},
      marca: {type: Sequelize.STRING, allowNull: false, field: "MARCA"},
      modelo: {type: Sequelize.STRING, allowNull: false, field: "MODELO"},
      serie: {type: Sequelize.STRING, allowNull: false, field: "SERIE"},
      disco: {type: Sequelize.STRING, allowNull: false, field: "DISCO"},
      motor: {type: Sequelize.STRING, allowNull: false, field: "MOTOR"},
      chasis: {type: Sequelize.STRING, allowNull: false, field: "CHASIS"},
      ubicacion: {type: Sequelize.STRING, allowNull: false, field: "UBICACION"},
      nivelOrganizacion: {type: Sequelize.STRING, allowNull: false, field: "NIVEL_ORGANIZACION"},
      custodio: {type: Sequelize.STRING, allowNull: false, field: "CUSTODIO"},
      conductor: {type: Sequelize.STRING, allowNull: false, field: "CONDUCTOR"},
      situacion: {type: Sequelize.STRING, allowNull: false, field: "SITUACION"},
      condicion: {type: Sequelize.STRING, allowNull: false, field: "CONDICION"},
      fechaCompra: {type: Sequelize.DATE, field: "FECHA_COMPRA"}, 
      valorCompra: {type: Sequelize.DOUBLE, field: "VALOR_COMPRA"},
      estado: {type: Sequelize.STRING, allowNull: false, field: "ESTADO"},
      tipoActivo: {type: Sequelize.STRING, allowNull: false, field: "TIPO_ACTIVO"},
      tipoActivoId: {type: Sequelize.INTEGER, allowNull: false, field: "ID_TIPO_ACTIVO"}, 
      claseActivoId: {type: Sequelize.INTEGER, allowNull: false, field: "ID_CLASE_ACTIVO"}, 
      userAsign: {type: Sequelize.STRING, allowNull: false, field: "USER_ASIGN"},
      dateAsign: {type: Sequelize.DATE, field: "DATE_ASIGN"}, 
      activoId: {type: Sequelize.INTEGER, allowNull: false, field: "ID_ACTIVO"}, 
      areaId: {type: Sequelize.INTEGER, allowNull: false, field: "ID_AREA"}, 
      userAsign2: {type: Sequelize.STRING, allowNull: false, field: "USER_ASIGN2"},
      dateAsign2: {type: Sequelize.DATE, field: "DATE_ASIGN2"}, 
      activoControl: {type: Sequelize.STRING, allowNull: false, field: "ACTIVO_CONTROL"}

    },{tableName: 'EAFTA_ACTIVO_MIGRACION'});
  
    ActivoMigracion.associate = function(models){
        ActivoMigracion.belongsTo(models.ArchivoMigracion,{foreignKey: 'archivoId', as: "Detalle"});
      //ActivoMigracion.belongsTo(models.VwActivo,{foreignKey: 'activoId', as: "Activo"});
    }
  
    return ActivoMigracion;
  };

