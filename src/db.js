const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: '5432',
  password: process.env.PASSWORD,
  user: 'postgres',
  database: 'task_manager_',
});

module.exports = pool;
