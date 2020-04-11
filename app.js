// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('db_inventario', 'inventario', 'admin', {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 9,
//     min: 0,
//     idle: 10000
//   }
// });

// const db = require("./model");
// db.sequelize.authenticate().then(() => {
//   console.log("Success!");
//   // var Posts = sequelize.define('posts', {
//   //   title: {
//   //     type: Sequelize.STRING
//   //   },
//   //   content: {
//   //     type: Sequelize.STRING
//   //   }
//   // }, {
//   //   freezeTableName: true
//   // });

//   // tipoMovimiento.sync({force: true}).then(function () {
//   //   return Posts.create({
//   //     title: 'Getting Started with PostgreSQL and Sequelize',
//   //     content: 'Hello there'
//   //   });
//   // });
// }).catch((err) => {
//   console.log(err);
// });
// console.log('Inicio');
// const TipoMovimiento = require('./controllers/tipoMovimientoController');
// TipoMovimiento.getAll();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let api = require('./routes/routes.js');

app.use('/api', api);

// set port
const port = process.env.PORT || 5200;

// start server
app.listen(port, function(){
    console.log(`Server started on port ${port}...`);
});