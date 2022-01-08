import { User, IUser } from './user.model';
import task from '../tasks/task.memory.repository';

const db: IUser[] = [];

/**
 * Returns all users
 * @returns array users
 */
const getAll = () => db;

/**
 * Returns users by id
 * @param id string 
 * @returns find user by id
 */
const getUser = (id: string) => db.filter((user) => user.id === id)[0];

/**
 * Returns new User
 * @param user object consist field: name - string; login - string; password - string 
 * @returns new user object consist field: name - string; login - string; password - string; id - string
 */
const createUser = ({ name, login, password }: IUser) => {
  const newUser = new User({ name, login, password });
  db.push(newUser);
  return newUser;
};

/**
 * Returns update User by id
 * @param id string
 * @param user object consist field: name - string; login - string; password - string 
 * @returns update user object consist field: name - string; login - string; id - string
 */
const updateUser = (id: string, data: IUser) => {
  const findUserIndex = db.findIndex((user) => user.id === id);
  db[findUserIndex] = { ...db[findUserIndex], ...data };
  return db[findUserIndex];
};

/**
 * Delete user by id
 * @param id string
 * @returns boolean value dependent if user finded return true, else false
 */
const deleteUser = (id: string) => {
  const findUserIndex = db.findIndex((user) => user.id === id);
  if (findUserIndex === -1) {
    return false;
  }
  db.splice(findUserIndex, 1);
  task.clearUserIdTask(id);
  return true;
};

export default {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
}