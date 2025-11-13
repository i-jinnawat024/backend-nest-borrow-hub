import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserResponseDto } from '../../dto/user.response.dto';
import { UserPresenter } from '../../presenters/user.presenter';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserResponseDto>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(command: CreateUserCommand): Promise<UserResponseDto> {
    const user = await this.userDomainService.registerUser({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      telNumber: command.telNumber || null,
      password: command.password,
    });
    
    return UserPresenter.toResponse(user.toPrimitives());
  }
}
