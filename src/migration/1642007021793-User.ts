import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { User } from '../users/entities/user.entity';

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
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
      }),
    );
    const admin = new User();
    admin.name = 'admin';
    admin.password = 'admin';
    admin.login = 'admin';
    await queryRunner.manager.save(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
