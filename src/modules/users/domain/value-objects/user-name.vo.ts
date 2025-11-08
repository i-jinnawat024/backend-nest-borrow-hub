import { DomainError } from "../errors/domain-error";

export class UserName {
  private constructor(private readonly _value: string) {}

  static create(name: string): UserName {
    const normalized = name.trim().replace(/\s+/g, " ");

    if (!normalized) {
      throw new DomainError("Name is required");
    }

    if (normalized.length < 2) {
      throw new DomainError("Name must be at least 2 characters");
    }

    if (normalized.length > 80) {
      throw new DomainError("Name is too long");
    }

    return new UserName(normalized);
  }

  get value(): string {
    return this._value;
  }
}
