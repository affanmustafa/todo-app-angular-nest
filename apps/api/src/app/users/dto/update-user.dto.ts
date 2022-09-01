import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
