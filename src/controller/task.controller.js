const express = require('express');
const route = express.Router();
const { createNewTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById } = require('../service/task.service');

route.post('/', async (req, res) => {
  try {
    const { task, user_id } = req.body;
    const data = await createNewTask(task, user_id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllTasks();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTaskById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, user_id } = req.body;
    const data = await updateTaskById(id, task, user_id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteTaskById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
