import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowHistoryLogsOrmEntity } from './entities/borrow-history-logs.entity';
import { DocumentOrmEntity } from './entities/document.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetDocumentListHandler } from './queries/handlers/get-document-list.handler';
import { DocumentRepository } from './repositories/document.repository';
import { DocumentController } from './document.controller';
import { GetDocumentHandler } from './queries/handlers/get-document.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([BorrowHistoryLogsOrmEntity, DocumentOrmEntity]),
  ],
  controllers: [DocumentController],
  providers: [GetDocumentListHandler, DocumentRepository, GetDocumentHandler],
  exports: [],
})
export class DocumentModule {}
