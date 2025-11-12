import { UserId } from '../value-objects/user-id.vo';
import { UserName } from '../value-objects/user-name.vo';

export interface UserRolePrimitive {
  id: string;
  name: string;
}

export interface UserPrimitiveProps {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  role?: UserRolePrimitive | null;
}

interface UserProps {
  id: UserId;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  role?: UserRolePrimitive | null;
}

interface RegisterUserProps {
  firstName: string;
  lastName: string;
  now?: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static register(props: RegisterUserProps): User {
    const now = props.now ?? new Date();

    return new User({
      id: UserId.create(),
      firstName: UserName.create(props.firstName).value,
      lastName: UserName.create(props.lastName).value,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      role: null,
    });
  }

  static fromPrimitives(raw: UserPrimitiveProps): User {
    return new User({
      id: UserId.create(raw.id),
      firstName: raw.firstName,
      lastName: raw.lastName,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
      role: raw.role ?? null,
    });
  }

  toPrimitives(): UserPrimitiveProps {
    return {
      id: this.id.value,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      deletedAt: this.props.deletedAt,
      role: this.props.role ?? null,
    };
  }

  get id(): UserId {
    return this.props.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get role(): UserRolePrimitive | null | undefined {
    return this.props.role;
  }

  setRole(role: UserRolePrimitive | null): void {
    this.props.role = role ?? null;
    this.touch();
  }

  changeFirstName(name: string): void {
    this.props.firstName = UserName.create(name).value;
    this.touch();
  }

  changeLastName(name: string): void {
    this.props.lastName = UserName.create(name).value;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
