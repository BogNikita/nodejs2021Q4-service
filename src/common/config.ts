import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret-key',
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  DB_PORT: process.env.DB_PORT || 5432,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_DB: process.env.POSTGRES_DB,
  DB_HOST: process.env.DB_HOST,
  SALT: process.env.SALT || 10,
  PASSWORD_HASH: process.env.PASSWORD_HASH || 'it_is_hash',
};
