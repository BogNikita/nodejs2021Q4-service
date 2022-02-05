import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  findByLogin(login: string) {
    return this.usersRepository.findOne(
      { login },
      { select: ['password', 'login'] },
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      await this.usersRepository.update(id, updateUserDto);
      const updateUser = await this.usersRepository.findOne(id);
      return updateUser;
    }
    return false;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      await this.usersRepository.delete(id);
      return true;
    }
    return false;
  }
}
