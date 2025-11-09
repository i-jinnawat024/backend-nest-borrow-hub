import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDocumentListQuery } from '../impl/get-document-list.query';
import { DocumentRepository } from '../../repositories/document.repository';
import { Logger } from '@nestjs/common';

@QueryHandler(GetDocumentListQuery)
export class GetDocumentListHandler
  implements IQueryHandler<GetDocumentListQuery>
{
  private readonly logger = new Logger(GetDocumentListHandler.name);
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(query: GetDocumentListQuery) {
    const result = await this.documentRepo.findAll();
    return result;
  }
}
