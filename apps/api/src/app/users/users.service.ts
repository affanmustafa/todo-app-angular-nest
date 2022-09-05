import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClient, Users } from '@prisma/client';

import * as argon from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPass = await argon.hash(createUserDto.password);
    console.log(hashedPass);
    return prisma.users.create({
      data: {
        username: createUserDto.username,
        password: hashedPass,
        name: createUserDto.name,
        email: createUserDto.email,
      },
    });
  }

  findAll(): Promise<Users[]> {
    return prisma.users.findMany();
  }

  findOne(uname: string): Promise<Users> {
    const userFind = prisma.users.findUnique({
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
