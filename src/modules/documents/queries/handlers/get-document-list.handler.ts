import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDocumentListQuery } from '../impl/get-document-list.query';
import { DocumentRepository } from '../../repositories/document.repository';

@QueryHandler(GetDocumentListQuery)
export class GetDocumentListHandler
  implements IQueryHandler<GetDocumentListQuery>
{
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(query: GetDocumentListQuery) {
    const result = await this.documentRepo.findAll();

    return result.sort((a, b) => {
      const aPriority = a.status === 'INACTIVE' ? 1 : 0;
      const bPriority = b.status === 'INACTIVE' ? 1 : 0;

      // 1️⃣ Sort INACTIVE ไปท้าย
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      // 2️⃣ Sort by createdAt descending
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
}
