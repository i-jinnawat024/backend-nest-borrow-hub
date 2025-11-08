import { Controller, Get, Logger, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDocumentListQuery } from './queries/impl/get-document-list.query';
import { GetDocumentQuery } from './queries/impl/get-documnet.query';

@Controller('documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

   @Get()
  getDocument(@Query('id') id: string) {
    return this.queryBus.execute(new GetDocumentQuery(id));
  }
  @Get()
  getDocumentList() {
    return this.queryBus.execute(new GetDocumentListQuery());
  }

 
}
