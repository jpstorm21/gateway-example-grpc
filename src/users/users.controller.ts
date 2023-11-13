import { Inject, Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import {
  UsersServiceClient,
  USERS_SERVICE_NAME,
} from './users.pb';

import type {
  CreateUserRequest,
  CreateUserResponse,
  Empty,
  GetUserByIdResponse,
  GetUsersResponse,
} from './users.pb';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
  ) { }
  private usersService: UsersServiceClient;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<UsersServiceClient>(
        USERS_SERVICE_NAME,
      );
  }

  @Post()
  async createUser(
    @Body() req: any,
  ): Promise<CreateUserResponse> {
    return firstValueFrom(this.usersService.createUser(req));
  }

  @Get()
  async getUsers(emptyRequest: Empty): Promise<GetUsersResponse> {
    return firstValueFrom(this.usersService.getUsers(emptyRequest));
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<GetUserByIdResponse> {
    return firstValueFrom(this.usersService.getUserById({ id }));
  }
}
