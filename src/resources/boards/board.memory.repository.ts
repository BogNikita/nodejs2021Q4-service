import { IBoard, Board } from './board.model';
import task from '../tasks/task.memory.repository';

const db: IBoard[] = [];

const getAll = () => db;

const getBoard = (id: string) => db.find((board) => board.id === id);

const createBoard = ({ title, columns }: IBoard) => {
  const newBoard = new Board({ title, columns });
  db.push(newBoard);
  return newBoard;
};

const updateBoard = (id: string, data: IBoard) => {
  const findBoardIndex = db.findIndex((board) => board.id === id);
  db[findBoardIndex] = { ...db[findBoardIndex], ...data };
  return db[findBoardIndex];
};

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
