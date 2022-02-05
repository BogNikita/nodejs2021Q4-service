import { IsArray, IsNotEmpty } from 'class-validator';
import { Columns } from '../../columns/entities/column.entity';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  @IsArray()
  columns: Columns[];
}
