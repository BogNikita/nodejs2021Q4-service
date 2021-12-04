const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const getBoard = (id) => boardRepo.getBoard(id);

const createBoard = (id, body) => boardRepo.createBoard(id, body);

const updateBoard = (id, body) => boardRepo.updateBoard(id, body);

const deleteBoard = (id) => boardRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
