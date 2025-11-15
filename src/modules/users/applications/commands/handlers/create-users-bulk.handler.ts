import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserPresenter } from '../../presenters/user.presenter';
import { UserResponseDto } from '../../dto/user.response.dto';
import { CreateUsersBulkCommand } from '../impl/create-users-bulk.command';

@CommandHandler(CreateUsersBulkCommand)
export class CreateUsersBulkHandler
  implements ICommandHandler<CreateUsersBulkCommand, UserResponseDto[]>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(command: CreateUsersBulkCommand): Promise<UserResponseDto[]> {
    const users = await this.userDomainService.registerUsersBulk(command.users);
    return users.map((user) => UserPresenter.toResponse(user.toPrimitives()));
  }
}

