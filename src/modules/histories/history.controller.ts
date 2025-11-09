import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CreateHistoryDto } from "./dtos/create-history.dto";
import { CreateHistoryCommand } from "./commands/impl/create-history.command";
import { GetUsersListQuery } from "../users/applications/queries/impl/get-users-list.query";
import { UserResponseDto } from "../users/applications/dto/user.response.dto";

@Controller("history")
export class HistoryController {
  private readonly logger = new Logger(HistoryController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get("users")
  getUsersViaHistory(): Promise<UserResponseDto[]> {
    return this.queryBus.execute(new GetUsersListQuery());
  }

  @Post()
  createHistory(@Body() body: CreateHistoryDto) {
    return this.commandBus.execute(new CreateHistoryCommand(body));
  }
}
