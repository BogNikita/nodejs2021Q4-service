const Board = require('./board.model');
const task = require('../tasks/task.memory.repository');

const db = [];

const getAll = async () => db;

const getBoard = (id) => db.find((board) => board.id === id);

const createBoard = ({ title, columns }) => {
  const newBoard = new Board({ title, columns });
  db.push(newBoard);
  return newBoard;
};

const updateBoard = (id, data) => {
  const findBoardIndex = db.findIndex((board) => board.id === id);
  db[findBoardIndex] = { ...db[findBoardIndex], ...data };
  return db[findBoardIndex];
};

const deleteBoard = (id) => {
  const findBoardIndex = db.findIndex((board) => board.id === id);
  if (findBoardIndex === -1) {
    return false;
  }
  db.splice(findBoardIndex, 1);
  task.clearBoardTasks(id);
  return true;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
