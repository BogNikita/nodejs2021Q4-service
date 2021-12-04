const User = require('./user.model');
const task = require('../tasks/task.memory.repository');

const db = [];

const getAll = async () => db;

const getUser = (id) => db.find((user) => user.id === id);

const createUser = ({ name, login, password }) => {
  const newUser = new User({ name, login, password });
  db.push(newUser);
  return newUser;
};

const updateUser = (id, data) => {
  const findUserIndex = db.findIndex((user) => user.id === id);
  db[findUserIndex] = { ...db[findUserIndex], ...data };
  return db[findUserIndex];
};

const deleteUser = (id) => {
  const findUserIndex = db.findIndex((user) => user.id === id);
  if (findUserIndex === -1) {
    return false
  }
  db.splice(findUserIndex, 1);
  task.clearUserIdTask(id)
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser, db };
