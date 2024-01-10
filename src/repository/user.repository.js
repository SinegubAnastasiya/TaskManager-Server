const pool = require('../db');

async function createUserDB(name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = 'INSERT INTO users(name, surname, email, pwd) VALUES($1, $2, $3, $4) RETURNING *';
    const { rows } = await client.query(sql, [name, surname, email, pwd]);

    await client.query('COMMIT');

    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    return [];
  }
}

async function getUsersDB() {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users';
  const { rows } = await client.query(sql);

  return rows;
}

async function getUserByIdDB(id) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await client.query(sql, [id]);

  return rows;
}

async function updateUserDB(id, name, surname, email, pwd) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = 'UPDATE users SET name = $1, surname = $2, email = $3, pwd = $4 WHERE id = $5 RETURNING *';
    const { rows } = await client.query(sql, [name, surname, email, pwd, id]);

    await client.query('COMMIT');

    return rows;
  } catch (error) {
    await client.query('ROLLBACK');
    return [];
  }
}

async function deleteUserDB(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const { rows } = await client.query(sql, [id]);

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

async function updateBodyDB(id, body) {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await client.query(sql, [id]);

  const newObj = { ...rows[0], ...body };
  const sql1 = 'UPDATE users SET name = $1, surname = $2, email = $3, pwd = $4 WHERE id = $5 RETURNING *';
  const { data } = await client.query(sql1, [newObj.name, newObj.surname, newObj.email, newObj.pwd, newObj.id]);

  return data;
}

module.exports = {
  createUserDB,
  getUsersDB,
  getUserByIdDB,
  updateUserDB,
  deleteUserDB,
  getUserByEmailDB,
  updateBodyDB,
};
