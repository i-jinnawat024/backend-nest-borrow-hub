import { ICommand } from "@nestjs/cqrs";
import { CreateHistoryDto } from "../../dtos/create-history.dto";

export class CreateHistoryCommand implements ICommand{
    constructor(
        public readonly documentId: number,
        public readonly userId: string,
        public readonly name: string,
        public readonly description: string,
    ){}
}