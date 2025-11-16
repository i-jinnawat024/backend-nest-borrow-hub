import { User, UserRolePrimitive } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.vo';

export interface UserRepository {
  save(user: User): Promise<void>;
  assignRole(userId: UserId, roleId: string): Promise<void>;
  findRoleById(roleId: string): Promise<UserRolePrimitive | null>;
  findRoleAdmin(): Promise<UserRolePrimitive | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  count(): Promise<number>;
  remove(userId: UserId): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
