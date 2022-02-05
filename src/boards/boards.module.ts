import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Columns } from '../columns/entities/column.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Columns]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Columns]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
})
export class BoardsModule {}
