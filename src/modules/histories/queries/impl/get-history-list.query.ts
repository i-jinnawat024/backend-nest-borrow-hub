import { IQuery } from '@nestjs/cqrs';
import { GetHistoryDto } from '../../dtos/get-history-list.dto';

export class GetHistoryListQuery implements IQuery {
  constructor(public readonly query?: GetHistoryDto) {}
}
