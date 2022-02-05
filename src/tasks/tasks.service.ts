import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);
    newTask.boardId = boardId;
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  findAll(boardId: string) {
    return this.tasksRepository.find({ boardId });
  }

  findOne(id: string) {
    return this.tasksRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne(id);
    if (task) {
      await this.tasksRepository.update(id, updateTaskDto);
      const updateTask = this.tasksRepository.findOne(id);
      return updateTask;
    }
    return false;
  }

  async remove(id: string) {
    const task = await this.tasksRepository.findOne(id);
    if (task) {
      await this.tasksRepository.delete(id);
      return true;
    }

    return false;
  }

  async clearUserIdTask(id: string) {
    const tasks = await this.tasksRepository.find({ userId: id });
    const clearIdTasks = tasks.map((item) => ({ ...item, userId: null }));
    await this.tasksRepository.save(clearIdTasks);
  }

  async clearBoardTasks(id: string) {
    const tasks = await this.tasksRepository.find({ boardId: id });
    await this.tasksRepository.remove(tasks);
  }
}
