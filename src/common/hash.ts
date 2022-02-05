import bcrypt from 'bcrypt';
import config from './config';

export const checkPass = async (
  password: string,
  dbPassword: string
): Promise<Boolean> => {
  const passwordWithHash = password + config.PASSWORD_HASH;
  const result = await bcrypt.compare(passwordWithHash, dbPassword);
  return result;
};

export const generateHash = async (password: string): Promise<string> => {
  const passwordWithHash = password + config.PASSWORD_HASH;
  const hash = await bcrypt.hash(passwordWithHash, +config.SALT);
  return hash;
};
