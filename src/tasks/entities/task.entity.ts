import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
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
}
