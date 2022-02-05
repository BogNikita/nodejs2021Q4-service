import { ConnectionOptions } from 'typeorm';
import { User1642007021793 as UserMigration } from '../migration/1642007021793-User';
import { Boards1642007055453 as BoardsMigration } from '../migration/1642007055453-Boards';
import { Tasks1642273516475 as TasksMigration } from '../migration/1642273516475-Tasks';
import { Columns1642231432003 as ColumnsMigration } from '../migration/1642231432003-Columns';
import { Board } from '../boards/entities/board.entity';
import { Columns } from '../columns/entities/column.entity';
import { Task } from '../tasks/entities/task.entity';
import { User } from '../users/entities/user.entity';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrations: [
    UserMigration,
    BoardsMigration,
    ColumnsMigration,
    TasksMigration,
  ],
  entities: [User, Board, Columns, Task],
  migrationsRun: true,
  cli: {
    migrationsDir: 'migration',
  },
};

export = connectionOptions;
