import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { UserDomainService } from "../../../domain/services/user-domain.service";
import { UserResponseDto } from "../../dto/user.response.dto";
import { UserPresenter } from "../../presenters/user.presenter";
import { GetUsersQuery } from "../impl/get-users.query";

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery, UserResponseDto[]> {
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userDomainService.listUsers();
    return users.map((user) => UserPresenter.toResponse(user));
  }
}
