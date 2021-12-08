import Router from 'koa-router';
import { IUser, User } from './user.model';
import usersService from './user.service';

const router = new Router();

export default router
  .get('/', (ctx) => {
    try {
      const users = usersService.getAll();
      ctx.body = users.map((item) => User.toResponse(item));
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .get('/:id', (ctx) => {
    try {
      const { id } = ctx.params;
      const user = usersService.getUser(id);
      if (user) {
        ctx.status = 200;
        ctx.body = User.toResponse(user);
      } else {
        ctx.status = 404;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .post('/', (ctx) => {
    try {
      const { name, login, password } = <IUser>ctx.request.body;
      const user = usersService.createUser({ name, login, password });
      ctx.status = 201;
      ctx.body = User.toResponse(user);
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .put('/:id', (ctx) => {
    try {
      const { id } = ctx.params;
      const data = <IUser>ctx.request.body;
      const user = usersService.updateUser(id, data);
      ctx.body = User.toResponse(user);
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .delete('/:id', (ctx) => {
    try {
      const { id } = ctx.params;
      const result = usersService.deleteUser(id);
      if (result) {
        ctx.status = 204;
      } else {
        ctx.status = 404;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  });
