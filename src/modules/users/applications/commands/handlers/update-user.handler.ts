import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserResponseDto } from '../../dto/user.response.dto';
import { UserPresenter } from '../../presenters/user.presenter';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler
  implements ICommandHandler<UpdateUserCommand, UserResponseDto>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(command: UpdateUserCommand): Promise<UserResponseDto> {
    const updated = await this.userDomainService.updateUser({
      id: command.id,
      firstName: command.firstName,
      lastName: command.lastName,
    });

    return UserPresenter.toResponse(updated);
  }
}
