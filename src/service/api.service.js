const bcrypt = require('bcrypt');
const { createUserDB, getUserByEmailDB } = require('../repository/api.repository');

const saltround = 3;

async function createUser(name, surname, email, pwd) {
  const foundedEmail = await getUserByEmailDB(email);
  if (foundedEmail.length) throw new Error('Such user has already existed');

  const hashedPwd = await bcrypt.hash(pwd, saltround);

  const [user] = await createUserDB(name, surname, email, hashedPwd);

  if (!user) throw new Error('Array is empty');
  // delete user.pwd;
  return { ...user, pwd: undefined };
}

async function userAuth(email, pwd) {
  const user = await getUserByEmailDB(email);
  if (!user.length) throw new Error('Wrong email or password');
  const data = user[0];
  const comparePwd = await bcrypt.compare(pwd, data.pwd);
  if (!comparePwd) throw new Error('Wrong email or password');

  // const hashedPwd = user.pwd;
  // if (!(await bcrypt.compare(pwd, hashedPwd))) throw new Error('Pwd is invalid');

  return user;
}

module.exports = { createUser, userAuth };
