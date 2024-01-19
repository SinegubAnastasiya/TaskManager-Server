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
  const user = await getUserByEmailDB(email);
  if (!user.length) throw new Error('Such user does not exist');

  const hashedPwd = user.pwd;
  if (!(await bcrypt.compare(pwd, hashedPwd))) throw new Error('Pwd is invalid');

  return user;
}

module.exports = { createUser, userAuth };
