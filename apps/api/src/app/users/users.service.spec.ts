import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';

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

class Argon2Mock {
  public hash = jest.fn().mockReturnValue('hash');
  public verify = jest.fn().mockReturnValue(true);
}

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  let argon2: Argon2Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: 'argon2',
          useClass: Argon2Mock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    argon2 = module.get<Argon2Mock>('argon2');

    const newUserTest: CreateUserDto = {
      username: 'kang',
      name: 'Kang The Conqueror',
      password: await argon2.hash('123'),
      email: 'kang@conqueror.com',
      tasks: [],
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const usersAll = service.findAll();
      expect(usersAll).resolves.toEqual(usersMany);
    });
  });
  describe('getOne', () => {
    it('should get user by username', () => {
      expect(service.findOne('user1')).resolves.toEqual(oneUser);
    });
  });
  describe('createOne', () => {
    it('should successfully create a new user', async () => {
      //Mock argon2 hashing for new user
      const hashedPassword = await argon2.hash.mockReturnValue(
        'hashedPassword'
      );
      console.log(hashedPassword);
      //Sample new user for test
      const newUserTest: CreateUserDto = {
        username: 'kang',
        name: 'Kang The Conqueror',
        password: argon2.hash('123'),
        email: 'kang@conqueror.com',
        tasks: [],
      };
      expect(
        service.create({
          username: 'kang',
          name: 'Kang The Conqueror',
          password: argon2.hash('123'),
          email: 'kang@conqueror.com',
          tasks: [],
        })
      ).resolves.toEqual(newUserTest);
    });
  });
});
