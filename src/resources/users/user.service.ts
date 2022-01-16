import usersRepo from './user.memory.repository';
import { IUser } from './user.model';

/**
 * Call function which return all users
 * @returns array users
 */
const getAll = () => usersRepo.getAll();

/**
 * Call function which return user by id
 * @param id string
 * @returns user
 */
const getUser = (id: string) => usersRepo.getUser(id);

/**
 * Call function which return new user
 * @param user string
 * @returns new user
 */
const createUser = (user: IUser) => usersRepo.createUser(user);

/**
 * Call function which return update user
 * @param id string
 * @param body object consisted field: name - string; login - string; password - string
 * @returns updated user
 */
const updateUser = (id: string, body: IUser) => usersRepo.updateUser(id, body);

/**
 * Call function which delete user by id
 * @param id string
 * @returns boolean value
 */
const deleteUser = (id: string) => usersRepo.deleteUser(id);

export default { getAll, getUser, createUser, updateUser, deleteUser };
