import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersService } from '../users/users.service';
import Argon2Module from '../common/providers/argon2.module';

@Module({
  imports: [Argon2Module],
  controllers: [TasksController],
  providers: [TasksService, UsersService],
})
export class TasksModule {}
