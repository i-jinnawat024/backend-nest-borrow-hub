import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UpdateDocumentCommand } from '../commands/impl/update-document.command';
import { UpdateDocumentDto } from '../dtos/update-document.dto';
import { GetDocumentQuery } from '../queries/impl/get-documnet.query';
import { DocumentOrmEntity } from '../entities/document.entity';

@Injectable()
export class DocumentAdapter {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async updateDocument(body: Partial<UpdateDocumentDto>) {
    await this.commandBus.execute(new UpdateDocumentCommand(body));
  }

  async getDocumentById(id: number): Promise<DocumentOrmEntity> {
    return this.queryBus.execute(new GetDocumentQuery(id));
  }
}
