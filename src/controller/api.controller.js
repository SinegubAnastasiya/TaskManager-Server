const express = require('express');
const route = express.Router();
const { createUser, userAuth } = require('../service/api.service');

route.post('/reg', async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUser(name, surname, email, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/auth', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await userAuth(email, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
