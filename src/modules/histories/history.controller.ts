import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Body, Controller, Get, Logger, Post, Query } from "@nestjs/common";
import { GetHistoryListQuery } from "./queries/impl/get-history-list.query";
import { GetHistoryDto } from "./dtos/get-history-list.dto";
import { GetHistoryDocumentQuery } from "./queries/impl/get-history-document.query";
import { GetHistoryUserQuery } from "./queries/impl/get-history-user.query";

@Controller("history")
export class HistoryController {
  private readonly logger = new Logger(HistoryController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  getHistoryList(@Query() query: Pick<GetHistoryDto, "status">) {
    return this.queryBus.execute(new GetHistoryListQuery(query));
  }

  @Get("user")
  getHistoryListByUserId(@Query() query: GetHistoryDto) {
    return this.queryBus.execute(new GetHistoryUserQuery(query));
  }

  @Get('document')
  getHistoryListByDocumentId(@Query() query: GetHistoryDto) {
    return this.queryBus.execute(new GetHistoryDocumentQuery(query));
  }

}
