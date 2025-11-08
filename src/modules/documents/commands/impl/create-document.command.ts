import { ICommand } from "@nestjs/cqrs";
import { CreateDocumentDto } from "../../dtos/create-document.dto";

export class CreateDocumentCommand implements ICommand {
  constructor(public readonly document: CreateDocumentDto) {}
}