import { getRepository } from 'typeorm';
import { IBoards, Board } from './board.model';
import task from '../tasks/task.memory.repository';
import { Columns } from '../columns/column.model';

/**
 * Return all board
 * @returns array board
 */
const getAll = async () => {
  const boards = await getRepository(Board).find({ relations: ['columns'] });
  return boards;
};

/**
 * Return board by id
 * @param boardId search string
 * @returns array board
 */
const getBoard = async (id: string) => {
  const board = await getRepository(Board).findOne(id, {
    relations: ['columns'],
  });
  return board;
};

/**
 * Create new board
 * @param board object include field title - string columns - string
 * @returns new board
 */
const createBoard = async ({ title, columns }: IBoards) => {
  const newBoard = new Board(title);
  const newColumns = columns.map((item) => new Columns(item.title, item.order));
  newBoard.columns = newColumns;

  await getRepository(Columns).save(newColumns);
  await getRepository(Board).save(newBoard);
  return newBoard;
};

/**
 * Updated board by id
 * @param id string for search board
 * @param board object include field title - string columns - string
 * @returns updated board
 */
const updateBoard = async (id: string, data: IBoards) => {
  let board = await getRepository(Board).findOne(id, {
    relations: ['columns'],
  });
  if (board) {
    board = { ...board, ...data };
    await getRepository(Board).save(board);
    return board;
  }
  return false;
};

/**
 * Delete board by id
 * @param id string for search board
 * @returns boolean value
 */
const deleteBoard = async (id: string) => {
  const board = await getRepository(Board).findOne(id);
  if (board) {
    await getRepository(Board).remove(board);
    await task.clearBoardTasks(id);
    return true;
  }
  return false;
};

export default { getAll, getBoard, createBoard, updateBoard, deleteBoard };
