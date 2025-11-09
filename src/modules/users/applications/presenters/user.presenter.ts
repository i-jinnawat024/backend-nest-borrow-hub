import {
  UserPrimitiveProps,
  UserRolePrimitive,
} from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dto/user.response.dto';

export class UserPresenter {
  static toResponse(user: UserPrimitiveProps): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: this.formatDate(user.createdAt),
      updatedAt: this.formatDate(user.updatedAt),
      deletedAt: this.formatDate(user.deletedAt),
      role: this.mapRole(user.role),
    };
  }

  private static mapRole(role?: UserRolePrimitive | null): string | null {
    if (!role) {
      return null;
    }

    return role.name;
  }

  private static formatDate(value?: Date | string | null): string | null {
    if (!value) {
      return null;
    }

    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
}
