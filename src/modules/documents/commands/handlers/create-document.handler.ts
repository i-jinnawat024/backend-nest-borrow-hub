import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDocumentCommand } from '../impl/create-document.command';
import { DocumentRepository } from '../../repositories/document.repository';
import { DocumentOrmEntity } from '../../entities/document.entity';
import { BadRequestException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import {
  FREEMIUM_CONTACT_MESSAGE,
  FREEMIUM_LIMITS,
} from 'src/common/constants/freemium.constant';
@CommandHandler(CreateDocumentCommand)
export class CreateDocumentHandler
  implements ICommandHandler<CreateDocumentCommand>
{
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(command: CreateDocumentCommand) {
    const { documents } = command;

    const totalDocuments = await this.documentRepo.countDocuments();
    if (
      totalDocuments + documents.length >
      FREEMIUM_LIMITS.MAX_DOCUMENT_RECORDS
    ) {
      throw new BadRequestException(FREEMIUM_CONTACT_MESSAGE);
    }

    const entities = documents.map((doc) => {
      const obj = new DocumentOrmEntity();
      Object.assign(obj, doc);
      return obj;
    });

    try {
      const result = await this.documentRepo.insertBulk(entities);
      if (!result) {
        throw new BadRequestException('Bulk create document failed');
      }
      return result.identifiers;
    } catch (e) {
      const code = e?.driverError?.code;
      if (e instanceof QueryFailedError && code === '23505') {
        throw new ConflictException(
          'Some documents already exist (duplicate document_id).',
        );
      }
      throw e;
    }
  }
}
