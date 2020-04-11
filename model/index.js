const dbConfig = require("../config/dbconfig.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
// 	dbConfig.DB, 
// 	dbConfig.USER, 
// 	dbConfig.PASSWORD, {
//   			host: dbConfig.HOST,
//   			dialect: dbConfig.dialect,
//   			define: {
//         		timestamps: false,
//         		freezeTableName: true
//     		},
//   			pool: {
// 			    max: dbConfig.pool.max,
// 			    min: dbConfig.pool.min,
// 			    acquire: dbConfig.pool.acquire,
// 			    idle: dbConfig.pool.idle
//   			}
// 	});
//const Sequelize = require("sequelize-oracle");
const Sequelize = require("spider-sequelize-oracle");
const sequelize = new Sequelize('oradesa', 'erco', 'erco',
   {
        host: '192.198.12.200',
        port: '1522',
        dialect: "oracle",
        define: {
            timestamps: false,
            freezeTableName: true
        },
        pool: { maxConnections: 5,
                maxIdleTime: 3000}
  });

const db = {};

//const  models = sequelize.import('./tipomovimiento');
db['EstadoSituacion'] = sequelize.import('./estadoSituacion');
db['PermisoEstado'] = sequelize.import('./permisoEstado');
db['VwActivo'] = sequelize.import('./vwActivo');
db['Acta'] = sequelize.import('./Acta');
db['ActaDetalle'] = sequelize.import('./actaDetalle');
//db['Medida'] = sequelize.import('./medida');
//db['Item'] = sequelize.import('./item');
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//db.tipoMovimiento = require("./tipomovimiento.js")(sequelize, Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;