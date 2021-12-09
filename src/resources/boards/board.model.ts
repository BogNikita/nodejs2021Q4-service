import { v1 } from 'uuid';

export interface IBoard {
  id?: string;
  title: string;
  columns: string;
}

/**
 * Board class create new board
 */
export class Board implements IBoard {
  id: string;

  title: string;

  columns: string;

  /**
   * @constructor create new user
   * @param board is object include field:
   * title - string default "Task"
   * columns- string
   */
  constructor({ title = 'Board', columns = '1' } = {}) {
    this.id = v1();
    this.title = title;
    this.columns = columns;
  }
}
