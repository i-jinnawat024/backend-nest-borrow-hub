import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDocumentCommand } from '../impl/update-document.command';
import { DocumentRepository } from '../../repositories/document.repository';
import { DocumentOrmEntity } from '../../entities/document.entity';
import { QueryFailedError } from 'typeorm';
import { ConflictException, Logger } from '@nestjs/common';

@CommandHandler(UpdateDocumentCommand)
export class UpdateDocumentHandler
  implements ICommandHandler<UpdateDocumentCommand>
{
  private readonly logger = new Logger(UpdateDocumentHandler.name);
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(command: UpdateDocumentCommand): Promise<{ success: boolean }> {
    const { document } = command;
    try {
      await this.documentRepo.updateDocument(document);
      return { success: true };
    } catch (e) {
      const code = e?.driverError?.code;

      if (e instanceof QueryFailedError && code === '23505') {
        throw new ConflictException(
          'Document already exists (document_id duplicate).',
        );
      }
      throw e;
    }
  }
}
