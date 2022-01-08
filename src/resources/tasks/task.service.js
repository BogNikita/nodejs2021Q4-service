const tasksRepo = require('./task.memory.repository');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getTask = (id) => tasksRepo.getTask(id);

const createTask = (id, body) => tasksRepo.createTask(id, body);

const updateTask = (id, body) => tasksRepo.updateTask(id, body);

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
