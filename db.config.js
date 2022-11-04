var Sequelize = require('sequelize');
const sequelize = new Sequelize(
 'spbdb',
 'root',
 'Srashti2604@',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 var db = {};

 db.sequelize = sequelize;
 db.Sequelize = Sequelize;
 
 module.exports = db;