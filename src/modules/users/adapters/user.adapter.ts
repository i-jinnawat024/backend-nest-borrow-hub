import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUsersCountQuery } from '../applications/queries/impl/get-users-count.query';

@Injectable()
export class UserAdapter {
  constructor(private readonly queryBus: QueryBus) {}

  async getUsersCount(): Promise<number> {
    return this.queryBus.execute(new GetUsersCountQuery());
  }
}

