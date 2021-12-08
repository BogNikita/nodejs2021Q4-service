import { v1 } from 'uuid';

export interface ITask {
  title: string;
  order: string;
  description: string;
  boardId: string;
  columnId: string;
  id?: string;
  userId?: null | string;
}

export class Task implements ITask {
  id: string;

  title: string;

  order: string;

  description: string;

  boardId: string;

  columnId: string;

  userId?: null | string;

  constructor({
    title = 'Task',
    order = 'desc',
    description = 'task description',
    boardId,
    userId,
    columnId,
  }: ITask) {
    this.id = v1();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
