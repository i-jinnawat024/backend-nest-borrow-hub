import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EDocumentStatus } from '../enums/document-status.enum';

export class UpdateDocumentDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  documentId: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  status: EDocumentStatus;
}
