import { ICommand } from "@nestjs/cqrs";
import { CreateHistoryDto } from "../../dtos/create-history.dto";

export class CreateHistoryCommand implements ICommand{
    constructor(
        public readonly body: CreateHistoryDto
    ){}
}