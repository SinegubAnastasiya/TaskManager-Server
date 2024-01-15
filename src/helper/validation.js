/* eslint-disable no-prototype-builtins */
function isValidId(req, res, next) {
  if (!req.params.hasOwnProperty('id')) throw new Error('There is no id');

  const { id } = req.params;

  if (typeof id != 'string' && typeof id != 'number') throw new Error('Invalid type of id');
  if (isNaN(id)) throw new Error('Id is not a number');
  if (id < 0) throw new Error('Id is less than 0');

  next();
}

function isValidInfo(req, res, next) {
  if (!req.body.hasOwnProperty('name')) throw new Error('There is no name');
  if (!req.body.hasOwnProperty('surname')) throw new Error('There is no surname');
  if (!req.body.hasOwnProperty('email')) throw new Error('There is no email');
  if (!req.body.hasOwnProperty('pwd')) throw new Error('There is no password');

  const { name, surname, email, pwd } = req.body;

  if (!name.length) throw new Error('Name is empty');
  if (!surname.length) throw new Error('Surname is empty');
  if (!email.length) throw new Error('Email is empty');
  if (!pwd.length) throw new Error('Password is empty');
  if (!/^[\w]+@[a-z]+\.[a-z]{2,4}/gm.test(email)) throw new Error('Email is invalid');
  if (pwd.length < 8) throw new Error('Password is short');

  next();
}

module.exports = { isValidInfo, isValidId };
