import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Columns } from 'src/columns/entities/column.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Columns)
    private columnsRepository: Repository<Columns>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardsRepository.create();
    newBoard.title = createBoardDto.title;
    newBoard.columns = await this.columnsRepository.save(
      createBoardDto.columns,
    );

    await this.boardsRepository.save(newBoard);

    return newBoard;
  }

  findAll() {
    return this.boardsRepository.find({
      relations: ['columns'],
    });
  }

  findOne(id: string) {
    return this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (board) {
      board.columns = updateBoardDto.columns;
      board.title = updateBoardDto.title;
      await this.boardsRepository.save(board);
      return board;
    }
    return false;
  }

  async remove(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (board) {
      await this.boardsRepository.delete(id);
      return true;
    }

    return false;
  }
}
