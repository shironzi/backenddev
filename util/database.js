const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'josh1578', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
