import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class BorrowDocumentDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  documentId: number[];

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  description: string;
}
