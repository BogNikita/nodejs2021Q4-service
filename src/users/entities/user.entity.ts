import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  name: string;
  login: string;
  password: string;
  id?: string;
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;
}
