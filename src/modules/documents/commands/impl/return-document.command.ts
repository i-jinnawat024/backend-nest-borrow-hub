import { ICommand } from '@nestjs/cqrs';
import { ReturnDocumentDto } from '../../dtos/return.document.dto';

export class ReturnDocumentCommand implements ICommand {
  constructor(public readonly body: ReturnDocumentDto) {}
}
