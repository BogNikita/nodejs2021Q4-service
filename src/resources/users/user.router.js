const Router = require('koa-router');
const User = require('./user.model');
const usersService = require('./user.service');

const router = new Router();

router
  .get('/', async (ctx) => {
    try {
      const users = await usersService.getAll();
      ctx.body = users.map(User.toResponse);
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
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
      ctx.body = 'Internal server error';
    }
  })
  .post('/', async (ctx) => {
    try {
      const { name, login, password } = ctx.request.body;
      const user = await usersService.createUser({ name, login, password });
      ctx.status = 201;
      ctx.body = User.toResponse(user);
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .put('/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;
      const user = await usersService.updateUser(id, body);
      ctx.body = User.toResponse(user);
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
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
      ctx.body = 'Internal server error';
    }
  });

module.exports = () => router.routes();
