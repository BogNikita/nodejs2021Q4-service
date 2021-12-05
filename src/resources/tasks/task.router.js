const Router = require('koa-router');
const tasksService = require('./task.service');

const router = new Router();

router
  .get('/:boardId/tasks', async (ctx) => {
    try {
      const { boardId } = ctx.params;
      const tasks = await tasksService.getAll(boardId);
      ctx.body = tasks;
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .get('/:boardId/tasks/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const task = await tasksService.getTask(id);
      if (task) {
        ctx.body = task;
      } else {
        ctx.status = 404;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .post('/:boardId/tasks', async (ctx) => {
    try {
      const { boardId } = ctx.params;
      const { title, order, description, userId, columnId } = ctx.request.body;
      const task = await tasksService.createTask({
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      });
      ctx.status = 201;
      ctx.body = task;
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .put('/:boardId/tasks/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const { body } = ctx.request;
      const task = await tasksService.updateTask(id, body);
      ctx.body = task;
    } catch (error) {
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  })
  .delete('/:boardId/tasks/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const result = await tasksService.deleteTask(id);
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
