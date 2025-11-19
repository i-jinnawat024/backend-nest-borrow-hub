import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetUsersCountQuery } from '../applications/queries/impl/get-users-count.query';
import { DeleteUserCommand } from '../applications/commands/impl/delete-user.command';

@Injectable()
export class UserAdapter {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getUsersCount(): Promise<number> {
    return this.queryBus.execute(new GetUsersCountQuery());
  }

  async deleteUser(id: string): Promise<void> {
    await this.commandBus.execute(new DeleteUserCommand(id));
  }
}
