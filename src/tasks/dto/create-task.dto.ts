import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  order: number;
  @IsNotEmpty()
  description: string;
  columnId: string | null;
  userId: null | string;
}
