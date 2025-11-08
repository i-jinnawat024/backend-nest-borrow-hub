import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

import { UserResponseDto } from "../../applications/dto/user.response.dto";
import { GetUsersQuery } from "../../applications/queries/impl/get-users.query";

@Controller("users")
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }
}
