import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryAdapter } from './adapters/history.adapter';
import { CreateHistoryHandler } from './commands/handlers/create-history.handler';
import { UpdateHistoryHandler } from './commands/handlers/update-history.handler';
import { HistoryEntity } from './entities/history.entity';
import { HistoryController } from './history.controller';
import { GetHistoryDocumentHandler } from './queries/handlers/get-history-document.handler';
import { GetHistoryListHandler } from './queries/handlers/get-history-list.handler';
import { GetHistoryUserHandler } from './queries/handlers/get-history-user.handler';
import { GetMonthlyTransactionCountHandler } from './queries/handlers/get-monthly-transaction-count.handler';
import { HistoryRepository } from './repositories/history.repository';
import { UserModule } from '../users/user.module';
import { DocumentModule } from '../documents/document.module';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => DocumentModule),
    TypeOrmModule.forFeature([HistoryEntity]),
    UserModule,
  ],
  controllers: [HistoryController],
  providers: [
    CreateHistoryHandler,
    HistoryRepository,
    HistoryAdapter,
    UpdateHistoryHandler,
    GetHistoryListHandler,
    GetHistoryDocumentHandler,
    GetHistoryUserHandler,
    GetMonthlyTransactionCountHandler,
  ],
  exports: [HistoryAdapter],
})
export class HistoryModule {}
