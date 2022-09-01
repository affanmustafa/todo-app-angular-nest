import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTasksDTO {
  @IsNumber()
  @IsOptional()
  id: number;

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
