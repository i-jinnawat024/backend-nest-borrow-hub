import { DomainError } from "../errors/domain-error";

export const USER_STATUS = ["pending", "active", "inactive", "suspended"] as const;
export type UserStatusType = (typeof USER_STATUS)[number];

export class UserStatus {
  private constructor(private readonly _value: UserStatusType) {}

  static create(status: UserStatusType): UserStatus {
    if (!USER_STATUS.includes(status)) {
      throw new DomainError(`Status ${status} is not supported`);
    }

    return new UserStatus(status);
  }

  static pending(): UserStatus {
    return new UserStatus("pending");
  }

  get value(): UserStatusType {
    return this._value;
  }

  isActive(): boolean {
    return this.value === "active";
  }
}
