import usersRepo from './user.memory.repository';
import { IUser } from './user.model';

const getAll = () => usersRepo.getAll();

const getUser = (id: string) => usersRepo.getUser(id);

const createUser = (user: IUser) => usersRepo.createUser(user);

const updateUser = (id: string, body: IUser) => usersRepo.updateUser(id, body);

const deleteUser = (id: string) => usersRepo.deleteUser(id);

export default { getAll, getUser, createUser, updateUser, deleteUser };
