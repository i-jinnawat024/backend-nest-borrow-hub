import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHistoryCommand } from '../impl/create-history.command';
import { BadRequestException, Logger } from '@nestjs/common';
import { HistoryRepository } from '../../repositories/history.repository';
import { EHistoryStatus } from '../../enums/history-status.enum';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  private readonly logger = new Logger(CreateHistoryHandler.name);
  constructor(private readonly historyRepo: HistoryRepository) {}

  async execute(command: CreateHistoryCommand) {
    const { documentId, userId, name, description } = command;
    await this.historyRepo.insertDocumentHistory({
      documentId,
      userId,
      name,
      description,
      status: EHistoryStatus.BORROWED,
    });
  }
}
