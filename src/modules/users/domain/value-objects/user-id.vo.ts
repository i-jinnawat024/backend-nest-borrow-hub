import { randomUUID } from "crypto";

import { DomainError } from "../errors/domain-error";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class UserId {
  private constructor(private readonly _value: string) {}

  static create(value?: string): UserId {
    const candidate = value ?? randomUUID();

    if (!UUID_REGEX.test(candidate)) {
      throw new DomainError("User id must be a valid UUID");
    }

    return new UserId(candidate);
  }

  get value(): string {
    return this._value;
  }

  equals(other?: UserId): boolean {
    return !!other && this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
