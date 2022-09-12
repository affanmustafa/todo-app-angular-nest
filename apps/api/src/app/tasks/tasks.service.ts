import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Tasks } from '@prisma/client';

import { TasksDTO } from './dto/createTask.dto';
import { UpdateTasksDTO } from './dto/updateTask.dto';

const prisma = new PrismaClient();

@Injectable()
export class TasksService {
  async create(newTask: TasksDTO) {
    const userFind = await prisma.users.findUnique({
      where: {
        username: newTask.userId,
      },
    });
    if (!userFind) {
      throw new NotFoundException('User for task creation not found');
    }
    return prisma.tasks.create({ data: newTask });
  }

  findAll(): Promise<Tasks[]> {
    return prisma.tasks.findMany();
  }

  async findOne(taskId: number): Promise<Tasks> {
    const taskFind = await prisma.tasks.findFirst({
      where: {
        id: taskId,
      },
    });

    if (!taskFind) {
      throw new NotFoundException('Task not found');
    }

    return taskFind;
  }

  async update(taskId: number, updateTaskDto: UpdateTasksDTO): Promise<Tasks> {
    const updateTask = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!updateTask || updateTask.id !== taskId) {
      throw new ForbiddenException(`Task with id ${taskId} not found!`);
    }

    return prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async remove(taskId: number): Promise<Tasks> {
    const deleteTask = await prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!deleteTask) {
      throw new NotFoundException('Task to be deleted not found');
    }
    return prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });
  }
}
