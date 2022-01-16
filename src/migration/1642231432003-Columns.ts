import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Columns1642231432003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'columns',
        columns: [
          {
            name: 'id',
            type: 'int',
            isUnique: true,
            isPrimary: true,
            isGenerated: true,
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
            name: 'boardId',
            type: 'uuid',
            isNullable: true
          },
        ],
      })
    );

    const foreignKey = new TableForeignKey({
      columnNames: ['boardId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'boards',
      onDelete: 'CASCADE',
    });
    
    await queryRunner.createForeignKey('columns', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('columns', true);
  }
}
