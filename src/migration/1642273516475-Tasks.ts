import {
  MigrationInterface,
  QueryRunner,
  Table,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks', true);
  }
}
