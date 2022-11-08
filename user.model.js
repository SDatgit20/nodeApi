var db = require('./db.config'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    profession: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
 });

sequelize.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
var user=User;
module.exports = user;