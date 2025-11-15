import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDocumentListQuery } from '../impl/get-document-list.query';
import { DocumentRepository } from '../../repositories/document.repository';
import { GetDocumentQuery } from '../impl/get-documnet.query';
import { DocumentOrmEntity } from '../../entities/document.entity';

@QueryHandler(GetDocumentQuery)
export class GetDocumentHandler implements IQueryHandler<GetDocumentQuery> {
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(query: GetDocumentQuery): Promise<DocumentOrmEntity | null> {
    const { id } = query;
    return this.documentRepo.findById(id);
  }
}
