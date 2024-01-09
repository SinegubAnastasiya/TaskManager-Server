const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    password: process.env.PASSWORD,
    user: 'postgres',
    database: 'task_manager'
})

module.exports = pool