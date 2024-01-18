const pool = require('../db');

async function createUserDB(name, surname, email, pwd) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const sql = 'INSERT INTO users(name, surname, email, pwd) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await client.query(sql, [name, surname, email, pwd]);

    await client.query('COMMIT');

    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    return [];
  }
}

async function getUserByEmailDB(email) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await client.query(sql, [email]);

  return rows;
}

module.exports = { createUserDB, getUserByEmailDB };
