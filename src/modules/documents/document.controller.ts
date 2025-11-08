import { Body, Controller, Get, Logger, Patch, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDocumentListQuery } from './queries/impl/get-document-list.query';
import { GetDocumentQuery } from './queries/impl/get-documnet.query';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { CreateDocumentCommand } from './commands/impl/create-document.command';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { UpdateDocumentCommand } from './commands/impl/update-document.command';

@Controller('documents')
export class DocumentController {
  private readonly logger = new Logger(DocumentController.name);
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':id')
  getDocument(@Query('id') id: string) {
    return this.queryBus.execute(new GetDocumentQuery(id));
  }
  @Get()
  getDocumentList() {
    return this.queryBus.execute(new GetDocumentListQuery());
  }

  @Post()
  createDocument(@Body() createDocumentDto: CreateDocumentDto) {
    return this.commandBus.execute(new CreateDocumentCommand(createDocumentDto));
  }
  @Put()
  updateDocument(@Body() updateDocumentDto: UpdateDocumentDto) {
    return this.commandBus.execute(new UpdateDocumentCommand(updateDocumentDto));
  }
}
