import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateHistoryCommand } from '../commands/impl/create-history.command';
import { UpdateHistoryCommand } from '../commands/impl/update-history.command';

@Injectable()
export class HistoryAdapter {
  constructor(private readonly commandBus: CommandBus) {}
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
}
