import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDocumentCommand } from '../impl/update-document.command';
import { DocumentRepository } from '../../repositories/document.repository';
import { DocumentOrmEntity } from '../../entities/document.entity';
import { QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';

@CommandHandler(UpdateDocumentCommand)
export class UpdateDocumentHandler
  implements ICommandHandler<UpdateDocumentCommand>
{
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(command: UpdateDocumentCommand): Promise<void> {
    const { document } = command;
    const documentOrm = new DocumentOrmEntity();
    Object.assign(documentOrm, document);
    try {
      await this.documentRepo.updateDocument(documentOrm);
    } catch (e) {
      const code = (e as any)?.driverError?.code;

      if (e instanceof QueryFailedError && code === '23505') {
        throw new ConflictException(
          'Document already exists (document_id duplicate).',
        );
      }
      throw e;
    }
  }
}
