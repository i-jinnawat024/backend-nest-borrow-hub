import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetMonthlyTransactionCountQuery } from '../impl/get-monthly-transaction-count.query';
import { HistoryRepository } from '../../repositories/history.repository';

@QueryHandler(GetMonthlyTransactionCountQuery)
export class GetMonthlyTransactionCountHandler
  implements IQueryHandler<GetMonthlyTransactionCountQuery, number>
{
  constructor(private readonly historyRepo: HistoryRepository) {}

  execute(query: GetMonthlyTransactionCountQuery): Promise<number> {
    return this.historyRepo.countMonthlyTransactions(
      query.year,
      query.month,
    );
  }
}
