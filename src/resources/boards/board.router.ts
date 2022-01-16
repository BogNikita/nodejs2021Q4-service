import Router from 'koa-router';
import { IBoards } from './board.model';
import boardsService from './board.service';

const router = new Router();

export default router
  .get('/', async (ctx) => {
    try {
      const boards = await boardsService.getAll();
      ctx.body = boards;
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .get('/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const board = await boardsService.getBoard(id);
      if (board) {
        ctx.body = board;
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
      const { title, columns } = <IBoards>ctx.request.body;
      const board = await boardsService.createBoard({ title, columns });
      ctx.status = 201;
      ctx.body = board;
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .put('/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const data = <IBoards>ctx.request.body;
      const board = await boardsService.updateBoard(id, data);
      if (board) {
        ctx.body = board;
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
      const result = await boardsService.deleteBoard(id);
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
