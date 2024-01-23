const express = require('express');
const route = express.Router();
const { createUser, userAuth } = require('../service/api.service');
const { buildResponse } = require('../helper/buildResponse');
const { createToken } = require('../helper/jwt');

route.post('/reg', async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUser(name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/auth', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await userAuth(email, pwd);
    const token = createToken(data);
    buildResponse(res, 200, token);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
