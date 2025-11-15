import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { UserResponseDto } from '../../dto/user.response.dto';
import { UserPresenter } from '../../presenters/user.presenter';
import { GetUserQuery } from '../impl/get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, UserResponseDto>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(query: GetUserQuery): Promise<UserResponseDto> {
    const user = await this.userDomainService.getUserById(
      UserId.create(query.id),
    );
    return UserPresenter.toResponse(user);
  }
}
