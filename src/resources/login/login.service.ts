import { getRepository } from 'typeorm';
import { checkPass } from '../../common/hash';
import { User } from '../users/user.model';

const loginUser = async (login: string, password: string) => {
  const user = await getRepository(User).findOne({ login });
  if (user) {
    const result = await checkPass(password, user.password);
    return result ? user : false;
  }
  return false;
};

export default {
  loginUser,
};
