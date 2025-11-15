import { ICommand } from '@nestjs/cqrs';
import { UpdateDocumentDto } from '../../dtos/update-document.dto';

export class UpdateDocumentCommand implements ICommand {
  constructor(public readonly document: Partial<UpdateDocumentDto>) {}
}
