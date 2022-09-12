import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClient, Users } from '@prisma/client';

import * as argon from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  helloWorld(): string {
    return 'Hello World!';
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const existingUser = await prisma.users.findUnique({
      where: {
        username: createUserDto.username,
      },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    //const hashedPass = await argon.hash(createUserDto.password);
    const createdUser = prisma.users.create({
      data: {
        ...createUserDto,
      },
    });
    return createdUser;
  }

  findAll(): Promise<Users[]> {
    return prisma.users.findMany();
  }

  async findOne(uname: string): Promise<Users> {
    const userFind = await prisma.users.findUnique({
      where: {
        username: uname,
      },
      include: {
        tasks: true,
      },
    });
    if (!userFind) {
      throw new NotFoundException('User not found');
    }
    return userFind;
  }

  async update(uname: string, updateUserDto: UpdateUserDTO): Promise<Users> {
    const updateUser = await prisma.users.findUnique({
      where: {
        username: uname,
      },
    });

    if (!updateUser || updateUser.username !== uname) {
      throw new NotFoundException('User not found');
    }

    await prisma.tasks.updateMany({
      where: {
        userId: uname,
      },
      data: {
        userId: uname,
      },
    });
    return prisma.users.update({
      where: {
        username: uname,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(uname: string): Promise<{ deleted: boolean }> {
    const deleteUser = await prisma.users.findUnique({
      where: {
        username: uname,
      },
    });

    if (!deleteUser || deleteUser.username !== uname) {
      throw new NotFoundException('User not found');
    }

    await prisma.users.delete({
      where: {
        username: uname,
      },
    });
    return { deleted: true };
  }
}
