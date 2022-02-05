import { v1 } from 'uuid';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Columns } from '../columns/column.model';

export interface IBoards {
  title: string;
  columns: Columns[];
  id?: string;
}

/**
 * Board class create new board
 */
@Entity({ name: 'boards' })
export class Board implements IBoards {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, (columns: Columns) => columns.board, {
    cascade: true,
  })
  columns!: Columns[];

  /**
   * @constructor create new user
   * @param board is object include field:
   * title - string default "Task"
   * columns- string
   */
  constructor(title: string) {
    this.id = v1();
    this.title = title;
  }
}
