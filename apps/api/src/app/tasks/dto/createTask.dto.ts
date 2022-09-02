import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class TasksDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  status: 'todo' | 'inprogress' | 'done';

  @IsNotEmpty()
  @IsString()
  userId: string;
}
