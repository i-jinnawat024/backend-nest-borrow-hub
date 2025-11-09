import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BorrowDocumentCommand } from "../impl/borrow-document.command";
import { DocumentAdapter } from "../../adapters/document.adapter";
import { UserDomainService } from "src/modules/users/domain/services/user-domain.service";
import { UserId } from "src/modules/users/domain/value-objects/user-id.vo";
import { BadRequestException, Logger } from "@nestjs/common";
import { DocumentOrmEntity } from "../../entities/document.entity";
import { UserPrimitiveProps } from "src/modules/users/domain/entities/user.entity";
import { BorrowDocumentDto } from "../../dtos/borrow-document.dto";
import { EDocumentStatus } from "../../enums/document-status.enum";
import { DocumentRepository } from "../../repositories/document.repository";
import { HistoryAdapter } from "src/modules/histories/adapters/history.adapter";

@CommandHandler(BorrowDocumentCommand)
export class BorrowDocumentHandler
  implements ICommandHandler<BorrowDocumentCommand>
{
    private readonly logger = new Logger(BorrowDocumentHandler.name)
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly documentRepo: DocumentRepository,
    private readonly historyAdapter: HistoryAdapter,
  ) {}

    private async buildPayload(document: DocumentOrmEntity,user: UserPrimitiveProps ,body: BorrowDocumentDto) {
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
    const [document,user] = await Promise.all([
      this.documentRepo.findById(body.id),
      this.userDomainService.getUserById(UserId.create(body.userId)),
    ]);
    if(!document || !user) throw new BadRequestException('Document or User not found');
    if(document.status !== EDocumentStatus.ACTIVE) throw new BadRequestException('ไม่สามารถยืมได้ เนื่องจากถูกยืมแล้ว')
    const payload = await this.buildPayload(document,user,body);

    await this.documentRepo.updateDocument({
      id: document.id,
      documentId: document.documentId,
      status: EDocumentStatus.BORROWED
    });
     await this.historyAdapter.insertDocumentHistory(
      document.id,
      payload.userId,
      payload.name,
      payload.description,
     );
  }
}
