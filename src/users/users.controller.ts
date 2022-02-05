import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);

      if (user) {
        return user;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);

      if (user) {
        return user;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(id);

      if (user) {
        await this.tasksService.clearUserIdTask(id);
        return;
      }
      throw new NotFoundException('User not found');
    } catch (error) {
      throw new HttpException(
        error.message,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
