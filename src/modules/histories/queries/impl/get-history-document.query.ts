import { IQuery } from "@nestjs/cqrs";
import { GetHistoryDto } from "../../dtos/get-history-list.dto";

export class GetHistoryDocumentQuery implements IQuery {
  constructor(public readonly query: GetHistoryDto) {}
}