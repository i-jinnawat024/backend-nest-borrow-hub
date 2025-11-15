import { UserEmail } from '../value-objects/user-email.vo';
import { UserId } from '../value-objects/user-id.vo';
import { UserName } from '../value-objects/user-name.vo';

export interface UserRolePrimitive {
  id: string;
  name: string;
}

export interface UserPrimitiveProps {
  id: string;
  email: string;
  telNumber: number | null;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role?: UserRolePrimitive | null;
}

interface UserProps {
  id: UserId;
  email: string;
  telNumber: number | null;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role?: UserRolePrimitive | null;
}

interface RegisterUserProps {
  email: string;
  telNumber: number | null;
  password: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  now?: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static register(props: RegisterUserProps): User {
    const now = props.now ?? new Date();

    return new User({
      id: UserId.create(),
      email:  UserEmail.create(props.email).value,
      telNumber: props.telNumber ?? null,
      password: props.password,
      firstName: UserName.create(props.firstName).value,
      lastName: UserName.create(props.lastName).value,
      role: null,
      isActive: props.isActive ?? true,
    });
  }

  static fromPrimitives(raw: UserPrimitiveProps): User {
    return new User({
      id: UserId.create(raw.id),
      email: raw.email,
      telNumber: raw.telNumber,
      password: raw.password,
      firstName: raw.firstName,
      lastName: raw.lastName,
      isActive: raw.isActive,
      role: raw.role ?? null,
    });
  }

  toPrimitives(): UserPrimitiveProps {
    return {
      id: this.id.value,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      role: this.props.role ?? null,
      email: this.props.email,
      telNumber: this.props.telNumber,
      password: this.props.password,
      isActive: this.props.isActive,
    };
  }

  get id(): UserId {
    return this.props.id;
  }

  // get createdAt(): Date {
  //   return this.props.createdAt;
  // }

  // get updatedAt(): Date {
  //   return this.props.updatedAt;
  // }

  get role(): UserRolePrimitive | null | undefined {
    return this.props.role;
  }

  get email(): string {
    return this.props.email;
  }

  get telNumber(): number | null {
    return this.props.telNumber;
  }
  
  get isActive(): boolean {
    return this.props.isActive;
  }
  
  canCreateUser(totalUser:number): boolean {
    return totalUser < 15;
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
    // this.props.updatedAt = new Date();
  }
}
