const { createTaskDB, getAllTasksDB, getTaskByIdDB, updateTaskDB, deleteTaskDB, updateTaskBodyDB } = require('../repository/task.repository');

async function createNewTask(task, user_id) {
  const data = await createTaskDB(task, user_id);
  if (!data.length) throw new Error('Array is empty');
  return data;
}

async function getAllTasks() {
  const data = await getAllTasksDB();
  return data;
}

async function getTaskById(id) {
  const data = await getTaskByIdDB(id);
  return data;
}

async function updateTaskById(id, task, user_id) {
  const data = await updateTaskDB(id, task, user_id);
  if (!data.length) throw new Error('Array is empty');
  return data;
}

async function deleteTaskById(id) {
  const data = await deleteTaskDB(id);
  return data;
}

async function updateTaskBody(id, body) {
  const data = await updateTaskBodyDB(id, body);
  return data;
}

module.exports = { createNewTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById, updateTaskBody };
