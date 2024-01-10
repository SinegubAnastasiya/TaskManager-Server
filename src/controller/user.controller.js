const express = require('express');
const route = express.Router();
const { createUser, getAllUsers, getUserById, updateUsers, deleteUserById, updateBody } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');
const { isValidUserId, isValidInfo } = require('../helper/validation');

route.post('/', isValidInfo, async (req, res) => {
  try {
    const { name, surname, email, pwd } = req.body;
    const data = await createUser(name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id', isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put('/:id', isValidUserId, isValidInfo, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, pwd } = req.body;
    const data = await updateUsers(id, name, surname, email, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete('/:id', isValidUserId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch('/:id', isValidUserId, isValidInfo, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const data = await updateBody(id, body);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
