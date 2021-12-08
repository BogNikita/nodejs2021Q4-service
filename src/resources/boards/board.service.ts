import boardRepo from './board.memory.repository';
import { IBoard } from './board.model';

const getAll = () => boardRepo.getAll();

const getBoard = (id: string) => boardRepo.getBoard(id);

const createBoard = (data: IBoard,) => boardRepo.createBoard(data);

const updateBoard = (id: string, body: IBoard) => boardRepo.updateBoard(id, body);

const deleteBoard = (id: string) => boardRepo.deleteBoard(id);

export default { getAll, getBoard, createBoard, updateBoard, deleteBoard };
