module.exports = {
  HOST: "localhost",
  USER: "inventario",
  PASSWORD: "admin",
  DB: "db_inventario",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};