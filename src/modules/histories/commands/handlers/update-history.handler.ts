import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHistoryCommand } from '../impl/update-history.command';
import { HistoryRepository } from '../../repositories/history.repository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateHistoryCommand)
export class UpdateHistoryHandler
  implements ICommandHandler<UpdateHistoryCommand>
{
  constructor(private readonly historyRepo: HistoryRepository) {}
  async execute(command: UpdateHistoryCommand): Promise<any> {
    const { documentId, userId } = command;
    if (!(await this.historyRepo.hasBorrowedDocument(documentId, userId))) {
      throw new BadRequestException('ข้อมูลการยืมไม่ถูกต้อง');
    }
    return this.historyRepo.updateDocumentHistory(documentId, userId);
  }
}
