import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../boards/board.model';

@Entity({ name: 'columns' })
export class Columns {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board: Board) => board.columns)
  board!: Board;

  constructor(title: string, order: number) {
    this.title = title;
    this.order = order;
  }
}
