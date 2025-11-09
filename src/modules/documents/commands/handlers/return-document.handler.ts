import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReturnDocumentCommand } from '../impl/return-document.command';
import { DocumentRepository } from '../../repositories/document.repository';
import { EDocumentStatus } from '../../enums/document-status.enum';
import { HistoryAdapter } from 'src/modules/histories/adapters/history.adapter';

@CommandHandler(ReturnDocumentCommand)
export class ReturnDocumentHandler
  implements ICommandHandler<ReturnDocumentCommand>
{
  constructor(
    private readonly documentRepo: DocumentRepository,
    private readonly historyAdapter: HistoryAdapter,
  ) {}

  async execute(command: ReturnDocumentCommand): Promise<void> {
    const { body } = command;

    await this.historyAdapter.updateDocumentHistory(body.id, body.userId);
    await this.documentRepo.updateDocument({
      id: body.id,
      status: EDocumentStatus.ACTIVE,
    });
  }
}
