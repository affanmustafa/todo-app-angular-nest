import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';

const newUserTest: CreateUserDto = {
  username: 'kang',
  name: 'Kang The Conqueror',
  password: 'marvel',
  email: 'kang@conqueror.com',
  tasks: [],
};

const usersMany = [
  {
    username: 'user1',
    name: 'User One',
    password: '123',
    email: 'user1@test.com',
    tasks: [],
  },
  {
    username: 'user2',
    name: 'User Two',
    password: '456',
    email: 'user2@test.com',
    tasks: [],
  },
  {
    username: 'user3',
    name: 'User Three',
    password: '789',
    email: 'user3@test.com',
    tasks: [],
  },
];

const oneUser = usersMany[0];

const db = {
  getAll: jest.fn().mockResolvedValue(usersMany),
  getOne: jest.fn().mockResolvedValue(oneUser),
  create: jest.fn().mockReturnValue(oneUser),
  update: jest.fn().mockResolvedValue(oneUser),
  remove: jest.fn().mockResolvedValue(oneUser),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const usersAll = await service.findAll();
      expect(usersAll).toEqual(usersMany);
    });
  });
  describe('getOne', () => {
    it('should get user by username', () => {
      expect(service.findOne('user1')).resolves.toEqual(oneUser);
    });
  });
  describe('createOne', () => {
    it('should successfully create a new user', () => {
      expect(
        service.create({
          username: 'kang',
          name: 'Kang The Conqueror',
          password: 'marvel',
          email: 'kang@conqueror.com',
          tasks: [],
        })
      ).resolves.toEqual(newUserTest);
    });
  });
});
