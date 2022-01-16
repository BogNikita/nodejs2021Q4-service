import {
  MigrationInterface,
  QueryRunner,
  Table,
//   TableForeignKey,
} from 'typeorm';

export class Tasks1642273516475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'order',
            type: 'int',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'boardId',
            type: 'uuid',
          },
          {
            name: 'columnId',
            type: 'int',
            isNullable: true,
            default: null,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
        ],
      })
    );
//     const foreignKeyUser = new TableForeignKey({
//       columnNames: ['userId'],
//       referencedColumnNames: ['id'],
//       referencedTableName: 'users',
//       onDelete: 'CASCADE',
//     });

//     const foreignKeyBoard = new TableForeignKey({
//       columnNames: ['boardId'],
//       referencedColumnNames: ['id'],
//       referencedTableName: 'boards',
//       onDelete: 'CASCADE',
//     });

//     const foreignKeyColumn = new TableForeignKey({
//       columnNames: ['columnId'],
//       referencedColumnNames: ['id'],
//       referencedTableName: 'columns',
//       onDelete: 'CASCADE',
//     });

//     await queryRunner.createForeignKeys('tasks', [
//       foreignKeyUser,
//       foreignKeyBoard,
//       foreignKeyColumn,
//     ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks', true);
  }
}
