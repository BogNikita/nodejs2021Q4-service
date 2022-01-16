import Router from 'koa-router';
import { ITask } from './task.model';
import tasksService from './task.service';

const router = new Router();

export default router
  .get('/:boardId/tasks', async (ctx) => {
    try {
      const { boardId } = ctx.params;
      const tasks = await tasksService.getAll(boardId);
      ctx.body = tasks;
    } catch (error) {
      console.log(error);
      
      ctx.status = 500;
      ctx.message = 'Internal server error';
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
      ctx.message = 'Internal server error';
    }
  })
  .post('/:boardId/tasks', async (ctx) => {
    try {
      const { boardId } = ctx.params;
      const { title, order, description, userId, columnId } = <ITask>(
        ctx.request.body
      );
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
      ctx.message = 'Internal server error';
    }
  })
  .put('/:boardId/tasks/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const data = <ITask>ctx.request.body;
      const task = await tasksService.updateTask(id, data);
      ctx.body = task;
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
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
      ctx.message = 'Internal server error';
    }
  });
