import { IQuery } from "@nestjs/cqrs";

export class GetHistoryBorrowedListQuery implements IQuery{
    constructor(
        public readonly userId: string,
    ){}
}
