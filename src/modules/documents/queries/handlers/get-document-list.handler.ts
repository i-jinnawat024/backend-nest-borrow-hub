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
      if (a.status === 'INACTIVE' && b.status !== 'INACTIVE') return 1;
      if (a.status !== 'INACTIVE' && b.status === 'INACTIVE') return -1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
}
