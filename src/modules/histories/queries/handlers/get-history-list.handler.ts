import { HistoryRepository } from './../../repositories/history.repository';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHistoryListQuery } from '../impl/get-history-list.query';

@QueryHandler(GetHistoryListQuery)
export class GetHistoryListHandler
  implements IQueryHandler<GetHistoryListQuery>
{
  private readonly logger = new Logger(GetHistoryListHandler.name);
  constructor(
    private readonly historyRepo: HistoryRepository,
  ) {}

  async execute(query: GetHistoryListQuery) {
    if(query.query.status) return await this.historyRepo.findByStatus(query.query.status);
    return this.historyRepo.findAll();
  }
}
