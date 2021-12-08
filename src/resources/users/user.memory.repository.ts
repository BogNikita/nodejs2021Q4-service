import { User, IUser } from './user.model';
import task from '../tasks/task.memory.repository';

const db: IUser[] = [];

const getAll = () => db;

const getUser = (id: string) => db.filter((user) => user.id === id)[0];

const createUser = ({ name, login, password }: IUser) => {
  const newUser = new User({ name, login, password });
  db.push(newUser);
  return newUser;
};

const updateUser = (id: string, data: IUser) => {
  const findUserIndex = db.findIndex((user) => user.id === id);
  db[findUserIndex] = { ...db[findUserIndex], ...data };
  return db[findUserIndex];
};

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