import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDocumentCommand } from '../impl/create-document.command';
import { DocumentRepository } from '../../repositories/document.repository';
import { DocumentOrmEntity } from '../../entities/document.entity';
import { BadRequestException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler
  implements ICommandHandler<CreateDocumentCommand>
{
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(command: CreateDocumentCommand) {
    const { document } = command;
    const documentOrmEntity = new DocumentOrmEntity();
    Object.assign(documentOrmEntity, document);
    try {
      const result = await this.documentRepo.insertDocument(documentOrmEntity);
      if (!result) throw new BadRequestException('Create document failed');
      return result;
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
