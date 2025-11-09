import { Module } from '@nestjs/common';
import { CreateHistoryHandler } from './commands/handlers/create-history.handler';
import { HistoryController } from './history.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { HistoryEntity } from './entities/history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './repositories/history.repository';
import { HistoryAdapter } from './adapters/history.adapter';
import { UpdateHistoryHandler } from './commands/handlers/update-history.handler';
import { GetHistoryListHandler } from './queries/handlers/get-history-list.handler';
import { GetHistoryDocumentHandler } from './queries/handlers/get-history-document.handler';
import { GetHistoryUserHandler } from './queries/handlers/get-history-user.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([HistoryEntity])],
  controllers: [HistoryController],
  providers: [
    CreateHistoryHandler,
    HistoryRepository,
    HistoryAdapter,
    UpdateHistoryHandler,
    GetHistoryListHandler,
    GetHistoryDocumentHandler,
    GetHistoryUserHandler,
  ],
  exports: [HistoryAdapter],
})
export class HistoryModule {}
