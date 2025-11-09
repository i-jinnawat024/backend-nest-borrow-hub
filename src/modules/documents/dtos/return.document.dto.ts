import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReturnDocumentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
