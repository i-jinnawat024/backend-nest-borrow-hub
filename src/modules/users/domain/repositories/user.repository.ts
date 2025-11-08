import { User } from "../entities/user.entity";
import { UserId } from "../value-objects/user-id.vo";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
