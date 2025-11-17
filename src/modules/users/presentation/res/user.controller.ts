import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserDto } from '../../applications/dto/create-user.dto';
import { UserResponseDto } from '../../applications/dto/user.response.dto';
import { UpdateUserDto } from '../../applications/dto/update-user.dto';
import { CreateUserCommand } from '../../applications/commands/impl/create-user.command';
import { UpdateUserCommand } from '../../applications/commands/impl/update-user.command';
import { DeleteUserCommand } from '../../applications/commands/impl/delete-user.command';
import { GetUserQuery } from '../../applications/queries/impl/get-user.query';
import { GetUsersListQuery } from '../../applications/queries/impl/get-users-list.query';
import { CreateUsersBulkCommand } from '../../applications/commands/impl/create-users-bulk.command';

@Controller('users')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.queryBus.execute(new GetUsersListQuery());
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const { firstName, lastName, email, telNumber, password } = body;
    return this.commandBus.execute(
      new CreateUserCommand(firstName, lastName, email, password, telNumber),
    );
  }

  @Post('bulk')
  async createBulk(
    @Body()
    body: CreateUserDto[],
  ): Promise<UserResponseDto[]> {
    const payload = body.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      telNumber: user.telNumber ?? null,
    }));
    return this.commandBus.execute(new CreateUsersBulkCommand(payload));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.commandBus.execute(
      new UpdateUserCommand(id, body.firstName, body.lastName, body.email, body.password),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
