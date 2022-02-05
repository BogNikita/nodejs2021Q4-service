import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import { IUser } from '../users/user.model';
import loginService from './login.service';
import config from '../../common/config';

const router = new Router();

export default router.post('/', async (ctx) => {
  try {
    const { login, password } = <IUser>ctx.request.body;
    const user = await loginService.loginUser(login, password);
    if (user) {
      const token = jwt.sign(
        { id: user.id, login: user.login },
        config.JWT_SECRET_KEY
      );
      ctx.body = { token };
      ctx.status = 200;
    } else {
      ctx.status = 403;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.message = 'Internal server error';
  }
});
