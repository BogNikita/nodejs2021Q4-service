import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity({ name: 'columns' })
export class Columns {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board: Board) => board.columns)
  board: Board;
}
