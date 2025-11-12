import { BadRequestException, Logger } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User, UserPrimitiveProps } from '../entities/user.entity';
import { DomainError } from '../errors/domain-error';
import { UserRepository } from '../repositories/user.repository';
import { UserId } from '../value-objects/user-id.vo';

const DEFAULT_SALT_ROUNDS = 10;

export interface RegisterUserCommand {
  firstName: string;
  lastName: string;
  email: string;
  telNumber?: number | null;
  password: string;
}

export interface UpdateUserCommand {
  id: string;
  firstName?: string;
  lastName?: string;
}

export class UserDomainService {
  constructor(private readonly repository: UserRepository,
  ) {}
  private readonly logger = new Logger(UserDomainService.name);
  async registerUser(command: RegisterUserCommand): Promise<User> {
    const [totalUser,role] = await Promise.all([
      this.repository.findAll(),
      this.repository.findRoleAdmin(),
    ]);
    if (!role) {
      throw new DomainError('Role not found');
    }

    const hashedPassword = await this.hashPassword(command.password);
    const user = User.register({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      telNumber: command.telNumber ?? null,
      password: hashedPassword,
      isActive: true,
    });
    if (!user.canCreateUser(totalUser.length)) {
      throw new BadRequestException('User limit reached');
    }

    Promise.all([
      this.repository.save(user),
      this.repository.assignRole(user.id, role.id),
    ]);
    user.setRole(role);
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

  private hashPassword(password: string): Promise<string> {
    return hash(password, DEFAULT_SALT_ROUNDS);
  }
}
