import { v1 } from 'uuid';

export interface IBoard {
  id?: string;
  title: string;
  columns: string;
}

export class Board implements IBoard {
  id: string;

  title: string;

  columns: string;

  constructor({ id = v1(), title = 'Board', columns = '1' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
