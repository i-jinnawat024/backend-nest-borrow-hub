import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateHistoryCommand } from '../commands/impl/create-history.command';
import { UpdateHistoryCommand } from '../commands/impl/update-history.command';

@Injectable()
export class HistoryAdapter {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async insertDocumentHistory(
    documentId: number,
    userId: string,
    name: string,
    description: string,
  ) {
    await this.commandBus.execute(
      new CreateHistoryCommand(documentId, userId, name, description),
    );
  }

  async updateDocumentHistory(documentId: number, userId: string) {
    await this.commandBus.execute(new UpdateHistoryCommand(documentId, userId));
  }

  // async getDocumentBorrowed(documentId: number) {
  //   await this.queryBus.execute(new GetDocumentBorrowedQuery(documentId));
  //   // return await this.documentRepo.findManyByDocumentId(documentId);
  // }
}
