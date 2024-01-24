const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  port: '5432',
  password: process.env.PASSWORD,
  user: 'postgres',
  database: 'task_manager_',
});

module.exports = pool;
