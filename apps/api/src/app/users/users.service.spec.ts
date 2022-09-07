import { Test } from '@nestjs/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = app.get<UsersService>(UsersService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.findAll()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
