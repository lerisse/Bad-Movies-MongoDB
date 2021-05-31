// require('dotenv').config('../Bad-Movies/.env');
require('dotenv').config()
module.exports = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'badmovies',
  API_KEY: process.env.API_KEY,
};