import Router from 'koa-router';
import { IUser, User } from './user.model';
import usersService from './user.service';

const router = new Router();

export default router
  .get('/', async (ctx) => {
    try {
      const users = await usersService.getAll();
      ctx.body = users.map((item) => User.toResponse(item));
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .get('/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const user = await usersService.getUser(id);
      if (user) {
        ctx.status = 200;
        ctx.body = User.toResponse(user);
      } else {
        ctx.status = 404;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .post('/', async (ctx) => {
    try {
      const { name, login, password } = <IUser>ctx.request.body;
      const user = await usersService.createUser({ name, login, password });
      ctx.status = 201;
      ctx.body = User.toResponse(user);
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .put('/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const data = <IUser>ctx.request.body;
      const user = await usersService.updateUser(id, data);
      if (user) {
        ctx.body = User.toResponse(user);
      } else {
        ctx.status = 404;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .delete('/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const result = await usersService.deleteUser(id);
      if (result) {
        ctx.status = 204;
      } else {
        ctx.status = 404;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  });
