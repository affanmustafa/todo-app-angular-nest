import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClient, Users } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): Promise<Users> {
    return prisma.users.create({ data: createUserDto });
  }

  findAll(): Promise<Users[]> {
    return prisma.users.findMany();
  }

  findOne(uname: string): Promise<Users> {
    return prisma.users.findUnique({
      where: {
        username: uname,
      },
      include: {
        tasks: true,
      },
    });
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

    return prisma.users.update({
      where: {
        username: uname,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(uname: string): Promise<Users> {
    const deleteUser = await prisma.users.findUnique({
      where: {
        username: uname,
      },
    });

    if (!deleteUser || deleteUser.username !== uname) {
      throw new NotFoundException('User not found');
    }

    return prisma.users.delete({
      where: {
        username: uname,
      },
    });
  }
}
