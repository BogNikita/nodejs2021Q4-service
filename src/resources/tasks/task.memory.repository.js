const Task = require('./task.model');

let db = [];

const getAll = async (boardId) => db.filter((task) => task.boardId === boardId);

const getTask = (id) => db.find((task) => task.id === id);

const createTask = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  db.push(newTask);
  return newTask;
};

const updateTask = (id, data) => {
  const findTaskIndex = db.findIndex((task) => task.id === id);
  db[findTaskIndex] = { ...db[findTaskIndex], ...data };
  return db[findTaskIndex];
};

const deleteTask = (id) => {
  const findTaskIndex = db.findIndex((task) => task.id === id);
  if (findTaskIndex === -1) {
    return false;
  }
  db.splice(findTaskIndex, 1);
  return true;
};

const clearUserIdTask = (id) => {
  db = db.map((task) => {
    if (task.userId === id) {
      return { ...task, userId: null };
    }
    return task;
  });
};

const clearBoardTasks = (id) => {
  db = db.filter((task) => task.boardId !== id);
};

module.exports = {
  getAll,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  clearUserIdTask,
  clearBoardTasks,
};
