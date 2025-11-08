import { DomainError } from "../errors/domain-error";

const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

export class UserEmail {
  private constructor(private readonly _value: string) {}

  static create(email: string): UserEmail {
    const normalized = email.trim().toLowerCase();

    if (!normalized) {
      throw new DomainError("Email is required");
    }

    if (!EMAIL_REGEX.test(normalized)) {
      throw new DomainError("Email is invalid");
    }

    return new UserEmail(normalized);
  }

  get value(): string {
    return this._value;
  }
}
