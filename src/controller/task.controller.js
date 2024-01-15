const express = require('express');
const route = express.Router();
const { createNewTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById, updateTaskBody } = require('../service/task.service');
const { buildResponse } = require('../helper/buildResponse');
const { isValidId } = require('../helper/validation')

route.post('/', async (req, res) => {
  try {
    const { task, user_id } = req.body;
    const data = await createNewTask(task, user_id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllTasks();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id',isValidId, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTaskById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const data = await updateTaskById(id, task, user_id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTaskById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const data = await updateTaskBody(id, body);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
