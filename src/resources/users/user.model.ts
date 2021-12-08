import { v1 } from 'uuid';

export interface IUser {
  name: string;
  login: string;
  password: string;
  id?: string;
}

export class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({ name = 'USER', login = 'user', password = 'P@55w0rd' }) {
    this.id = v1();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
