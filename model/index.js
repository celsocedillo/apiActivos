const config = require('../../config/config');
const Sequelize = require("spider-sequelize-oracle");
const logger =require('../utils/logger');
const sequelize = new Sequelize(config.baseDatos, config.usuario, config.password,
   {
        host: config.host,
        port: config.puerto,
        dialect: "oracle",
        define: {
            timestamps: false,
            freezeTableName: true
        },
        pool: { maxConnections: 5,
                maxIdleTime: 3000},
        logging: logger.info
  });

const db = {};

//const  models = sequelize.import('./tipomovimiento');
db['EstadoSituacion'] = sequelize.import('./estadoSituacion');
db['PermisoEstado'] = sequelize.import('./permisoEstado');
db['VwActivo'] = sequelize.import('./vwActivo');
db['Acta'] = sequelize.import('./Acta');
db['ActaDetalle'] = sequelize.import('./actaDetalle');
db['ArchivoMigracion'] = sequelize.import('./ArchivoMigracion');
db['ActivoMigracion'] = sequelize.import('./ActivoMigracion');
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//db.tipoMovimiento = require("./tipomovimiento.js")(sequelize, Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;