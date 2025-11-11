import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowHistoryLogsOrmEntity } from './entities/borrow-history-logs.entity';
import { DocumentOrmEntity } from './entities/document.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { GetDocumentListHandler } from './queries/handlers/get-document-list.handler';
import { DocumentRepository } from './repositories/document.repository';
import { DocumentController } from './document.controller';
import { GetDocumentHandler } from './queries/handlers/get-document.handler';
import { CreateDocumentHandler } from './commands/handlers/create-document.handler';
import { UpdateDocumentHandler } from './commands/handlers/update-document.handler';
import { DocumentAdapter } from './adapters/document.adapter';
import { BorrowDocumentHandler } from './commands/handlers/borrow-document.handler';
import { UserModule } from '../users/user.module';
import { HistoryModule } from '../histories/history.module';
import { ReturnDocumentHandler } from './commands/handlers/return-document.handler';

@Module({
  imports: [
    CqrsModule,
    UserModule,
    forwardRef(() => HistoryModule),
    TypeOrmModule.forFeature([BorrowHistoryLogsOrmEntity, DocumentOrmEntity]),
  ],
  controllers: [DocumentController],
  providers: [
    GetDocumentListHandler,
    DocumentRepository,
    GetDocumentHandler,
    CreateDocumentHandler,
    UpdateDocumentHandler,
    BorrowDocumentHandler,
    ReturnDocumentHandler,
    DocumentAdapter,
  ],
  exports: [DocumentAdapter],
})
export class DocumentModule {}
