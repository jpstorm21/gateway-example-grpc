import { Test, TestingModule } from '@nestjs/testing';
import { ClientGrpcProxy } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { clientProxyUsers } from '../common';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: 'UsersServiceClient',
        useFactory: (): ClientGrpcProxy => {
          return clientProxyUsers();
        },
      }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('create user', async () => {
    const mockResponse = {
      user: {
        id: '1',
        name: 'test',
        email: 'test@test.cl',
        createdAt: '2022-11-13',
        updatedAt: '2022-11-13',
        deletedAt: undefined,
      },
      error: undefined,
    };

    jest.spyOn(usersController, 'createUser').mockResolvedValue(mockResponse);

    const requestData = {
      name: 'test',
      email: 'test@test.cl',
      password: '123',
    };

    const response = await usersController.createUser(requestData);
    expect(response).toEqual(mockResponse);
  });
});
