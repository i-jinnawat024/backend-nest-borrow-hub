import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHistoryDocumentQuery } from '../impl/get-history-document.query';
import { HistoryRepository } from '../../repositories/history.repository';

@QueryHandler(GetHistoryDocumentQuery)
export class GetHistoryDocumentHandler
  implements IQueryHandler<GetHistoryDocumentQuery>
{
  constructor(private readonly historyRepository: HistoryRepository) {}

  async execute(query: GetHistoryDocumentQuery): Promise<any> {
    if (!query.query.documentId) return [];

    return this.historyRepository.findByDocumentId(query.query.documentId);
  }
}
