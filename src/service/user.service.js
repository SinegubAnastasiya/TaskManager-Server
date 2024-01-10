const {
  createUserDB,
  getUsersDB,
  getUserByIdDB,
  updateUserDB,
  deleteUserDB,
  getUserByEmailDB,
  updateBodyDB,
} = require('../repository/user.repository');

async function createUser(name, surname, email, pwd) {
  const foundUser = await getUserByEmailDB(email);
  if (foundUser.length) throw new Error('Such email has already existed');
  const newUser = await createUserDB(name, surname, email, pwd);
  if (!newUser.length) throw new Error('Data does not saved');
  return newUser;
}

async function getAllUsers() {
  const allUsers = await getUsersDB();
  return allUsers;
}

async function getUserById(id) {
  const allUsers = await getUserByIdDB(id);
  return allUsers;
}

async function updateUsers(id, name, surname, email, pwd) {
  const data = await updateUserDB(id, name, surname, email, pwd);
  if (!data.length) throw new Error('Data does not saved');
  return data;
}

async function deleteUserById(id) {
  const data = await deleteUserDB(id);
  if (!data.length) throw new Error('Data does not saved');
  return data;
}

async function updateBody(id, body) {
  const data = await updateBodyDB(id, body);
  // if (!data.length) throw new Error('Data does not saved')
  return data;
}

module.exports = { createUser, getAllUsers, getUserById, updateUsers, deleteUserById, updateBody };
