import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTasksDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: 'todo' | 'inprogress' | 'done';

  @IsString()
  @IsNotEmpty()
  userId: string;
}
