const { createTaskDB, getAllTasksDB, getTaskByIdDB, updateTaskDB } = require('../repository/task.repository');

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

module.exports = { createNewTask, getAllTasks, getTaskById, updateTaskById };
