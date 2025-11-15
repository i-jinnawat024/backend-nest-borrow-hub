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
    const result = users.map((user) => UserPresenter.toResponse(user));
    return result.sort((a,b)=>{
      if(a.isActive && !b.isActive){
        return -1;
      }
      if(!a.isActive && b.isActive){
        return 1;
      }
      return 0;
    });
  }
}
