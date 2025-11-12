import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { EHistoryStatus } from '../enums/history-status.enum';
import { Type } from 'class-transformer';

export class GetHistoryDto {
  @IsEnum(EHistoryStatus)
  @IsOptional()
  status?: EHistoryStatus;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  documentId?: number;
}
