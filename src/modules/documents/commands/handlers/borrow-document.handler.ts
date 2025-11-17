import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BorrowDocumentCommand } from '../impl/borrow-document.command';
import { DocumentAdapter } from '../../adapters/document.adapter';
import { UserDomainService } from 'src/modules/users/domain/services/user-domain.service';
import { UserId } from 'src/modules/users/domain/value-objects/user-id.vo';
import { BadRequestException, Logger } from '@nestjs/common';
import { DocumentOrmEntity } from '../../entities/document.entity';
import { UserPrimitiveProps } from 'src/modules/users/domain/entities/user.entity';
import { BorrowDocumentDto } from '../../dtos/borrow-document.dto';
import { EDocumentStatus } from '../../enums/document-status.enum';
import { DocumentRepository } from '../../repositories/document.repository';
import { HistoryAdapter } from 'src/modules/histories/adapters/history.adapter';
import {
  FREEMIUM_CONTACT_MESSAGE,
  FREEMIUM_LIMITS,
} from '../../../../common/constants/freemium.constant';

@CommandHandler(BorrowDocumentCommand)
export class BorrowDocumentHandler
  implements ICommandHandler<BorrowDocumentCommand>
{
  private readonly logger = new Logger(BorrowDocumentHandler.name);
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly documentRepo: DocumentRepository,
    private readonly historyAdapter: HistoryAdapter,
  ) {}

  private async buildPayload(
    document: DocumentOrmEntity,
    user: UserPrimitiveProps,
    body: BorrowDocumentDto,
  ) {
    return {
      documentId: document.id,
      userId: user.id,
      name: user.firstName + ' ' + user.lastName,
      description: body.description,
      createdAt: new Date(),
    };
  }
  async execute(command: BorrowDocumentCommand) {
    const { body } = command;
    const { userId, documentId } = body;

    const user = await this.userDomainService.getUserById(
      UserId.create(userId),
    );
    if (!user) throw new BadRequestException('ไม่พบเจ้าหน้าที่');

    const documentList = await this.documentRepo.findManyByIds(documentId);
    if (!documentList.length) throw new BadRequestException('ไม่พบเล่มทะเบียน');

    const invalidDocs = documentList.filter(
      (doc) => doc.status !== EDocumentStatus.ACTIVE,
    );
    if (invalidDocs.length > 0) {
      const ids = invalidDocs.map((d) => d.documentId).join(', ');
      throw new BadRequestException(
        `ไม่สามารถยืมได้ เนื่องจากบางเล่มถูกยืมแล้ว หรือไม่พร้อมใช้งาน (${ids})`,
      );
    }

    const payloads = await Promise.all(
      documentList.map(async (document) =>
        this.buildPayload(document, user, body),
      ),
    );

    const now = new Date();
    const monthlyTransactions =
      await this.historyAdapter.getMonthlyTransactionCount(
        now.getFullYear(),
        now.getMonth(),
      );

    if (
      monthlyTransactions + payloads.length >
      FREEMIUM_LIMITS.MAX_MONTHLY_BORROW_TRANSACTIONS
    ) {
      throw new BadRequestException(FREEMIUM_CONTACT_MESSAGE);
    }

    await Promise.all(
      payloads.map((payload) =>
        this.historyAdapter.insertDocumentHistory(
          payload.documentId,
          payload.userId,
          payload.name,
          payload.description,
        ),
      ),
    );

    await Promise.all(
      documentList.map((document) =>
        this.documentRepo.updateDocument({
          id: document.id,
          documentId: document.documentId,
          status: EDocumentStatus.BORROWED,
          updatedAt: undefined,
        }),
      ),
    );

    return {
      message: 'ยืมเล่มทะเบียนสำเร็จ',
    };
  }
}
