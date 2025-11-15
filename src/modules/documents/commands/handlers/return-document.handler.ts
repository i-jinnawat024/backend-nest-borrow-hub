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
    const { documentIds, userId } = command.body;

    for (const id of documentIds) {
      // อัปเดตประวัติตามแต่ละเล่ม
      await this.historyAdapter.updateDocumentHistory(id, userId);

      // เปลี่ยนสถานะเอกสารให้ ACTIVE
      await this.documentRepo.updateDocument({
        id,
        status: EDocumentStatus.ACTIVE,
      });
    }
  }
}
