// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gamezona', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;