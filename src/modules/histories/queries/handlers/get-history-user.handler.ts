import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHistoryUserQuery } from '../impl/get-history-user.query';
import { HistoryRepository } from '../../repositories/history.repository';
import { DocumentAdapter } from 'src/modules/documents/adapters/document.adapter';
import { HistoryEntity } from '../../entities/history.entity';

@QueryHandler(GetHistoryUserQuery)
export class GetHistoryUserHandler
  implements IQueryHandler<GetHistoryUserQuery>
{
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
          userId: r.userId,
          name: r.name,
          description: r.description,
          document,
          status: r.status,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
        };
      }),
    );
  }
  async execute(query: GetHistoryUserQuery): Promise<any> {
    if (!query.query.userId) return [];
    return await this.tranformData(
      await this.historyRepo.findByUserId(query.query.userId),
    );
  }
}
