import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { GetUsersCountQuery } from '../impl/get-users-count.query';

@QueryHandler(GetUsersCountQuery)
export class GetUsersCountHandler
  implements IQueryHandler<GetUsersCountQuery, number>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  execute(): Promise<number> {
    return this.userDomainService.getUsersCount();
  }
}

