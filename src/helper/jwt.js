const jwt = require('jsonwebtoken');

function createToken() {
  const secret = 'secretWord';

  return jwt.sign({}, secret);
}

module.exports = { createToken };
