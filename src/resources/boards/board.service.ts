import boardRepo from './board.memory.repository';
import { IBoards } from './board.model';

/**
 * Call function which return all boards
 * @returns array boards
 */
const getAll = () => boardRepo.getAll();

/**
 * Call function which return board by id
 * @param id search string
 * @returns find board
 */
const getBoard = (id: string) => boardRepo.getBoard(id);

/**
 * Call function which return new board
 * @param board object consist field title: string;
 * columns - string
 * @returns new board
 */
const createBoard = (data: IBoards) => boardRepo.createBoard(data);

/**
 * Call function which return update board by id
 * @param id search string
 * @param board object consist field title: string;
 * columns - string
 * @returns updated task
 */
const updateBoard = (id: string, board: IBoards) =>
  boardRepo.updateBoard(id, board);

/**
 * Call function which delete board by id
 * @param id search string
 * @returns boolean value
 */
const deleteBoard = (id: string) => boardRepo.deleteBoard(id);

export default { getAll, getBoard, createBoard, updateBoard, deleteBoard };
