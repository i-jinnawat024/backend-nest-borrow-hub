import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHistoryCommand } from '../impl/create-history.command';
import { BadRequestException, Logger } from '@nestjs/common';
import { HistoryRepository } from '../../repositories/history.repository';
import { HistoryEntity } from '../../entities/history.entity';
import { DocumentAdapter } from 'src/modules/documents/adapters/document.adapter';
import { UserDomainService } from 'src/modules/users/domain/services/user-domain.service';
import { UserId } from 'src/modules/users/domain/value-objects/user-id.vo';
import {  UserPrimitiveProps } from 'src/modules/users/domain/entities/user.entity';
import { DocumentOrmEntity } from 'src/modules/documents/entities/document.entity';
import { CreateHistoryDto } from '../../dtos/create-history.dto';
import { EDocumentStatus } from 'src/modules/documents/enums/document-status.enum';

@CommandHandler(CreateHistoryCommand)
export class CreateHistoryHandler
  implements ICommandHandler<CreateHistoryCommand>
{
  private readonly logger = new Logger(CreateHistoryHandler.name);
  constructor(
    private readonly historyRepo: HistoryRepository,
    private readonly documentAdapter: DocumentAdapter,
    private readonly userDomainService: UserDomainService,
  ) {}

  private async buildPayload(document: DocumentOrmEntity,user: UserPrimitiveProps ,body: CreateHistoryDto): Promise<Pick<HistoryEntity, 'documentId' | 'userId' | 'name' | 'description' | 'createdAt'>> {
    return {
      documentId: document.id,
      userId: user.id,
      name: user.firstName + ' ' + user.lastName,
      description: body.description,
      createdAt: new Date(),
    };
  }
  async execute(command: CreateHistoryCommand) {
    const { body } = command;
    const [document,user] = await Promise.all([
      this.documentAdapter.getDocumentById(body.id),
      this.userDomainService.getUserById(UserId.create(body.userId)),
    ]);
    if(!document || !user) throw new BadRequestException('Document or User not found');
    const payload = await this.buildPayload(document,user,body);
    await this.historyRepo.insertDocumentHistory(payload);
    this.logger.debug(document)
    await this.documentAdapter.updateDocument({
      id: document.id,
      documentId: document.documentId,
      status: EDocumentStatus.BORROWED
    })
  }
}
