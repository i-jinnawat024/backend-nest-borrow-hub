import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserResponseDto } from '../../dto/user.response.dto';
import { UserPresenter } from '../../presenters/user.presenter';
import { GetUsersListQuery } from '../impl/get-users-list.query';

@QueryHandler(GetUsersListQuery)
export class GetUsersListHandler
  implements IQueryHandler<GetUsersListQuery, UserResponseDto[]>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userDomainService.listUsers();
    return users.map((user) => UserPresenter.toResponse(user));
  }
}
