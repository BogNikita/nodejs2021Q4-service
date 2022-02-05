import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/:boardId/tasks')
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get('/:boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get('/:boardId/tasks/:id')
  async findOne(@Param('id') id: string) {
    try {
      const task = await this.tasksService.findOne(id);

      if (task) {
        return task;
      }
      throw new NotFoundException('Task not found');
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:boardId/tasks/:id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.tasksService.update(id, updateTaskDto);

      if (task) {
        return task;
      }
      throw new NotFoundException('Task not found');
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:boardId/tasks/:id')
  async remove(@Param('id') id: string) {
    try {
      const task = await this.tasksService.remove(id);

      if (task) {
        return;
      }
      throw new NotFoundException('Task not found');
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
