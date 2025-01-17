const { Sequelize } = require('sequelize');
require('dotenv').config();  // Certifique-se de carregar as variáveis de ambiente

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,  // Adicione a porta caso seja diferente da padrão
    dialect: 'postgres',
  });
module.exports = sequelize;
