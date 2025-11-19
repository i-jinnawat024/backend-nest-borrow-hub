import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, Logger } from '@nestjs/common';

import { DeleteDocumentCommand } from '../impl/delete-document.command';
import { DocumentRepository } from '../../repositories/document.repository';

@CommandHandler(DeleteDocumentCommand)
export class DeleteDocumentHandler
  implements ICommandHandler<DeleteDocumentCommand>
{
  private readonly logger = new Logger(DeleteDocumentHandler.name);
  constructor(private readonly documentRepo: DocumentRepository) {}

  async execute(command: DeleteDocumentCommand): Promise<void> {
    const { id } = command;

    const document = await this.documentRepo.findById(id);
    if (!document) {
      throw new NotFoundException('Document not found');
    }

    await this.documentRepo.deleteDocument(id);
    this.logger.debug(`Document ${id} soft deleted`);
  }
}

