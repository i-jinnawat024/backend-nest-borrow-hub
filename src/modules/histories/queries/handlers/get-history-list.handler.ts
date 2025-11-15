import { HistoryRepository } from './../../repositories/history.repository';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHistoryListQuery } from '../impl/get-history-list.query';
import { DocumentAdapter } from 'src/modules/documents/adapters/document.adapter';
import { HistoryEntity } from '../../entities/history.entity';

@QueryHandler(GetHistoryListQuery)
export class GetHistoryListHandler
  implements IQueryHandler<GetHistoryListQuery>
{
  private readonly logger = new Logger(GetHistoryListHandler.name);
  constructor(
    private readonly historyRepo: HistoryRepository,
    private readonly documentAdapter: DocumentAdapter,
  ) {}

  async getDocument(id: number) {
    return await this.documentAdapter.getDocumentById(id);
  }

  async tranformData(histories: HistoryEntity[]) {
    return await Promise.all(
      histories.map(async (r) => {
        const document = await this.getDocument(r.documentId);
        return {
          id: r.id,
          name: r.name,
          description: r.description,
          document,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt
        };
      }),
    );
  }
  async execute(query: GetHistoryListQuery) {
    if (query.query.status) {
      return this.tranformData(
        await this.historyRepo.findByStatus(query.query.status),
      );
    }
    this.tranformData(await this.historyRepo.findAll());
  }
}
