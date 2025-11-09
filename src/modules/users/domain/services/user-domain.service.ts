import { Logger } from '@nestjs/common';
import { User, UserPrimitiveProps } from '../entities/user.entity';
import { DomainError } from '../errors/domain-error';
import { UserRepository } from '../repositories/user.repository';
import { UserId } from '../value-objects/user-id.vo';

export interface RegisterUserCommand {
  firstName: string;
  lastName: string;
  now?: Date;
}

export interface UpdateUserCommand {
  id: string;
  firstName?: string;
  lastName?: string;
}

export class UserDomainService {
  constructor(private readonly repository: UserRepository) {}
  private readonly logger = new Logger(UserDomainService.name);
  async registerUser(command: RegisterUserCommand): Promise<User> {
    const user = User.register({
      firstName: command.firstName,
      lastName: command.lastName,
      now: command.now,
    });

    await this.repository.save(user);
    return user;
  }

  async listUsers(): Promise<UserPrimitiveProps[]> {
    const users = await this.repository.findAll();
    return users.map((user) => user.toPrimitives());
  }

  async getUserById(userId: UserId): Promise<UserPrimitiveProps> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new DomainError('User not found');
    }
    return user.toPrimitives();
  }

  async updateUser(command: UpdateUserCommand): Promise<UserPrimitiveProps> {
    const userId = UserId.create(command.id);
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new DomainError('User not found');
    }

    const hasFirstName = typeof command.firstName === 'string';
    const hasLastName = typeof command.lastName === 'string';
    if (!hasFirstName && !hasLastName) {
      throw new DomainError('Nothing to update');
    }

    if (hasFirstName) {
      user.changeFirstName(command.firstName as string);
    }

    if (hasLastName) {
      user.changeLastName(command.lastName as string);
    }

    await this.repository.save(user);
    return user.toPrimitives();
  }

  async deleteUser(userId: UserId): Promise<void> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new DomainError('User not found');
    }

    await this.repository.remove(userId);
  }
}
