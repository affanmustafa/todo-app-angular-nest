import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class TasksDTO {
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
