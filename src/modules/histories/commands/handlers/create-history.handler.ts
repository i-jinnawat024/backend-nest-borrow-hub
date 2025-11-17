import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHistoryCommand } from '../impl/create-history.command';
import { BadRequestException, Logger } from '@nestjs/common';
import {
  FREEMIUM_CONTACT_MESSAGE,
  FREEMIUM_LIMITS,
} from '../../../../common/constants/freemium.constant';
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
    const now = new Date();
    const monthlyTransactions =
      await this.historyRepo.countMonthlyTransactions(
        now.getFullYear(),
        now.getMonth(),
      );

    if (
      monthlyTransactions >=
      FREEMIUM_LIMITS.MAX_MONTHLY_BORROW_TRANSACTIONS
    ) {
      throw new BadRequestException(FREEMIUM_CONTACT_MESSAGE);
    }

    await this.historyRepo.insertDocumentHistory({
      documentId,
      userId,
      name,
      description,
      status: EHistoryStatus.BORROWED,
    });
  }
}
