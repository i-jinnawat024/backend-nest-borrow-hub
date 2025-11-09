import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
