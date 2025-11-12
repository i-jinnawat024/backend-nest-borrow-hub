import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserDomainService } from '../../../domain/services/user-domain.service';
import { UserId } from '../../../domain/value-objects/user-id.vo';
import { DeleteUserCommand } from '../impl/delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.userDomainService.deleteUser(UserId.create(command.id));
  }
}
