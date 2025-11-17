import { ICommand } from '@nestjs/cqrs';

import { RegisterUserCommand } from '../../../domain/services/user-domain.service';

export class CreateUsersBulkCommand implements ICommand {
  constructor(public readonly users: RegisterUserCommand[]) {}
}

