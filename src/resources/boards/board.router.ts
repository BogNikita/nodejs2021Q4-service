import Router from 'koa-router';
import { IBoard } from './board.model';
import boardsService from './board.service';

const router = new Router();

export default router
  .get('/', (ctx) => {
    try {
      const boards = boardsService.getAll();
      ctx.body = boards;
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .get('/:id', (ctx) => {
    try {
      const { id } = ctx.params;
      const board = boardsService.getBoard(id);
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
  .post('/', (ctx) => {
    try {
      const { title, columns } = <IBoard>ctx.request.body;
      const board = boardsService.createBoard({ title, columns });
      ctx.status = 201;
      ctx.body = board;
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .put('/:id', (ctx) => {
    try {
      const { id } = ctx.params;
      const data = <IBoard>ctx.request.body;
      const board = boardsService.updateBoard(id, data);
      ctx.body = board;
    } catch (error) {
      ctx.status = 500;
      ctx.message = 'Internal server error';
    }
  })
  .delete('/:id', (ctx) => {
    try {
      const { id } = ctx.params;
      const result = boardsService.deleteBoard(id);
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
