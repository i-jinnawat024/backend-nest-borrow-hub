import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BorrowDocumentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  description: string;
}
