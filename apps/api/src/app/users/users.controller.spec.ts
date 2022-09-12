import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const newUser: CreateUserDto = {
      username: 'wolverine',
      password: '123',
      email: 'wolverine@gmx.com',
      name: 'Wolverine',
      tasks: [],
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                username: 'wolverine',
                name: 'Wolverine',
                password: '123',
                email: 'wolverine@gmx.com',
              },
              {
                username: 'mustafa',
                name: 'Mustafa',
                password: 'abc',
                email: 'mustafa@gmail.com',
              },
            ]),
            findOne: jest.fn().mockImplementation((username: string) =>
              Promise.resolve({
                name: newUser.name,
                email: newUser.email,
                password: newUser.password,
                username,
                tasks: newUser.tasks,
              })
            ),
            create: jest
              .fn()
              .mockImplementation((newUserDto: CreateUserDto) => {
                Promise.resolve({ ...newUserDto });
              }),
            update: jest
              .fn()
              .mockImplementation((username: string, user: UpdateUserDTO) =>
                Promise.resolve({ username, ...user })
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Get all Users', () => {
    it('should get all Users', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          username: 'wolverine',
          name: 'Wolverine',
          password: '123',
          email: 'wolverine@gmx.com',
        },
        {
          username: 'mustafa',
          name: 'Mustafa',
          password: 'abc',
          email: 'mustafa@gmail.com',
        },
      ]);
    });
  });
  describe('Get a user by Username', () => {
    it('should get one username', async () => {
      await expect(controller.findOne('wolverine')).resolves.toEqual({
        username: 'wolverine',
        password: '123',
        email: 'wolverine@gmx.com',
        name: 'Wolverine',
        tasks: [],
      });
    });
  });
  describe('Delete a user', () => {
    it('should return that a user has been deleted', async () => {
      await expect(controller.remove('wolverine')).resolves.toEqual({
        deleted: true,
      });
    });
  });
  describe('Update a user', () => {
    it('should update the name of a user', async () => {
      const updatedUser: UpdateUserDTO = {
        username: 'wolverine',
        name: 'Logan',
        password: '123',
        email: 'wolverine@gmx.com',
      };
      await expect(
        controller.update('wolverine', updatedUser)
      ).resolves.toEqual({
        username: 'wolverine',
        ...updatedUser,
      });
    });
  });
});
