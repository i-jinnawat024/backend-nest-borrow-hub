import { ICommand } from "@nestjs/cqrs";

export class UpdateHistoryCommand implements ICommand {
  constructor(
    public readonly documentId: number,
    public readonly userId: string,
  ) {}
}