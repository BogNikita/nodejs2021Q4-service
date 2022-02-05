import { v1 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

export interface ITask {
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string | null;
  id?: string;
  userId: null | string;
}
/**
 * Task class create new task
 */
@Entity({ name: 'tasks' })
export class Task implements ITask {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column('uuid')
  boardId: string;

  @Column({ type: 'int', nullable: true })
  columnId: string | null;

  @Column({ type: 'uuid', nullable: true })
  userId: string | null;

  /**
   * @constructor create new task
   * @param task is object include field:
   * title - string default "Task"
   * order - string default "desc"
   * boardId - string
   * userId - string | null
   * columnId - string
   */
  constructor(
    title: string,
    order: number,
    description: string,
    boardId: string,
    columnId: string | null = null,
    userId: string | null = null
  ) {
    this.id = v1();
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }
}
