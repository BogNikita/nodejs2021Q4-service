import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Columns } from '../../columns/entities/column.entity';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Columns, (columns: Columns) => columns.board, {
    cascade: true,
  })
  columns!: Columns[];
}
