import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { generateHash } from '../common/hash';
import { User } from '../resources/users/user.model';

export class User1642007021793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
        ],
      })
    );
    const pass = await generateHash('admin');
    const admin = new User('admin', 'admin', pass);
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
