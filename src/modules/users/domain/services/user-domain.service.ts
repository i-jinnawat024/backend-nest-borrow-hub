import { User, UserPrimitiveProps } from "../entities/user.entity";
import { DomainError } from "../errors/domain-error";
import { UserRepository } from "../repositories/user.repository";
import { UserId } from "../value-objects/user-id.vo";

export interface RegisterUserCommand {
  firstName: string;
  lastName: string;
  now?: Date;
}

export class UserDomainService {
  constructor(private readonly repository: UserRepository) {}

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
      throw new DomainError("User not found");
    }
    return user.toPrimitives();
  }
}
