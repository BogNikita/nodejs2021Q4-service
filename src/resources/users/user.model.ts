import { v1 } from 'uuid';

export interface IUser {
  name: string;
  login: string;
  password: string;
  id?: string;
}
/**
 * User class create new user
 */
export class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
   * @constructor create new user
   * @param user is object include field: 
   * name - string default "USER"
   * login - string default "user"
   * password string default "P@55w0rd"
   */
  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' }) {
    this.id = v1();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Returns user without password
   * @param user object consist field: name - string; login - string; password - string
   * @returns user without password
   */
  static toResponse(user: IUser): Omit<IUser, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
