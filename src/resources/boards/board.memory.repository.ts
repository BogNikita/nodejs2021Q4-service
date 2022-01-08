import { IBoard, Board } from './board.model';
import task from '../tasks/task.memory.repository';

const db: IBoard[] = [];

/**
 * Return all board
 * @returns array board
 */
const getAll = () => db;

/**
 * Return board by id
 * @param boardId search string
 * @returns array board
 */
const getBoard = (id: string) => db.find((board) => board.id === id);

/**
 * Create new board
 * @param board object include field title - string columns - string
 * @returns new board
 */
const createBoard = ({ title, columns }: IBoard) => {
  const newBoard = new Board({ title, columns });
  db.push(newBoard);
  return newBoard;
};

/**
 * Updated board by id
 * @param id string for search board
 * @param board object include field title - string columns - string
 * @returns updated board
 */
const updateBoard = (id: string, data: IBoard) => {
  const findBoardIndex = db.findIndex((board) => board.id === id);
  db[findBoardIndex] = { ...db[findBoardIndex], ...data };
  return db[findBoardIndex];
};

/**
 * Delete board by id
 * @param id string for search board
 * @returns boolean value
 */
const deleteBoard = (id: string) => {
  const findBoardIndex = db.findIndex((board) => board.id === id);
  if (findBoardIndex === -1) {
    return false;
  }
  db.splice(findBoardIndex, 1);
  task.clearBoardTasks(id);
  return true;
};

export default { getAll, getBoard, createBoard, updateBoard, deleteBoard };
