import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TasksService } from '../tasks/tasks.service';
import Argon2Module from '../common/providers/argon2.module';

@Module({
  imports: [Argon2Module],
  controllers: [UsersController],
  providers: [UsersService, TasksService],
})
export class UsersModule {}
