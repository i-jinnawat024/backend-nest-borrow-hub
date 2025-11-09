import { ICommand } from "@nestjs/cqrs";
import { BorrowDocumentDto } from "../../dtos/borrow-document.dto";

export class BorrowDocumentCommand implements ICommand {
  constructor(public readonly body: BorrowDocumentDto) {}
}