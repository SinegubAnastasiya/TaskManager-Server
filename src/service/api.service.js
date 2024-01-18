const bcrypt = require('bcrypt');
const { createUserDB, getUserByEmailDB } = require('../repository/api.repository');

const saltround = 3;

async function createUser(name, surname, email, pwd) {
  const foundedEmail = await getUserByEmailDB(email);
  if (foundedEmail.length) throw new Error('Such user has already existed');

  const hashedPwd = await bcrypt.hash(pwd, saltround);

  const data = await createUserDB(name, surname, email, hashedPwd);

  if (!data.length) throw new Error('Array is empty');
  return data;
}

async function userAuth(email, pwd) {
  const data = await createUserDB(email, pwd);
  if (!data.length) throw new Error('Array is empty');
  return data;
}

module.exports = { createUser, userAuth };
