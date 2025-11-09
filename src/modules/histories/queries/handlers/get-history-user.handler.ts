import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetHistoryUserQuery } from "../impl/get-history-user.query";
import { HistoryRepository } from "../../repositories/history.repository";

@QueryHandler(GetHistoryUserQuery)
export class GetHistoryUserHandler implements IQueryHandler<GetHistoryUserQuery> {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async execute(query: GetHistoryUserQuery): Promise<any> {
    if(!query.query.userId) return [];
    
      return this.historyRepository.findByUserId(query.query.userId);
  }
}