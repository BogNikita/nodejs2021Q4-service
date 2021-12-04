const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUser(id);

const createUser = (id, body) => usersRepo.createUser(id, body);

const updateUser = (id, body) => usersRepo.updateUser(id, body);

const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
