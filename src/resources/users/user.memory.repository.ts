import { getRepository } from 'typeorm';
import { User, IUser } from './user.model';
import tasks from '../tasks/task.memory.repository';

/**
 * Returns all users
 * @returns array users
 */
const getAll = async () => {
  const allUsers = await getRepository(User).find();
  return allUsers;
};

/**
 * Returns users by id
 * @param id string
 * @returns find user by id
 */
const getUser = async (id: string) => {
  const user = await getRepository(User).findOne(id);
  return user;
};

/**
 * Returns new User
 * @param user object consist field: name - string; login - string; password - string
 * @returns new user object consist field: name - string; login - string; password - string; id - string
 */
const createUser = async ({ name, login, password }: IUser) => {
  const newUser = new User(name, login, password);
  await getRepository(User).save(newUser);
  return newUser;
};

/**
 * Returns update User by id
 * @param id string
 * @param user object consist field: name - string; login - string; password - string
 * @returns update user object consist field: name - string; login - string; id - string
 */
const updateUser = async (id: string, data: IUser) => {
  let user = await getRepository(User).findOne(id);
  if (user) {
    user = { ...user, ...data };
    await getRepository(User).save(user);
    return user;
  }
  return false;
};

/**
 * Delete user by id
 * @param id string
 * @returns boolean value dependent if user finded return true, else false
 */
const deleteUser = async (id: string) => {
  const user = await getRepository(User).findOne(id);
  if (user) {
    await tasks.clearUserIdTask(id);
    await getRepository(User).remove(user);
    return true;
  }
  return false;
};

export default {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
