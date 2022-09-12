import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uname')
  findOne(@Param('uname') uname: string) {
    return this.usersService.findOne(uname);
  }

  @Patch(':uname')
  update(@Param('uname') uname: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(uname, updateUserDto);
  }

  @Delete(':uname')
  remove(@Param('uname') uname: string) {
    return this.usersService.remove(uname);
  }
}
