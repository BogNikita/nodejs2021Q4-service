import { ConnectionOptions } from 'typeorm';
import CONFIG from './common/config';
import { User1642007021793 as UserMigration } from './migration/1642007021793-User';
import { Boards1642007055453 as BoardsMigration } from './migration/1642007055453-Boards';
import { Tasks1642273516475 as TasksMigration } from './migration/1642273516475-Tasks';
import { Columns1642231432003 as ColumnsMigration } from './migration/1642231432003-Columns';
import { Board } from './resources/boards/board.model';
import { Columns } from './resources/columns/column.model';
import { Task } from './resources/tasks/task.model';
import { User } from './resources/users/user.model';

const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: CONFIG.DB_HOST,
  port: +CONFIG.DB_PORT,
  username: CONFIG.POSTGRES_USER,
  password: CONFIG.POSTGRES_PASSWORD,
  database: CONFIG.POSTGRES_DB,
  synchronize: false,
  logging: false,
  migrations: [
    UserMigration,
    BoardsMigration,
    ColumnsMigration,
    TasksMigration,
  ],
  entities: [User, Board, Columns, Task],
};

export default ORMConfig;
