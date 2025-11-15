import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReturnDocumentDto {
  @IsNotEmpty()
   @Type(() => Number)
   @IsArray()
   documentIds: number[];

  @IsNotEmpty()
  @IsString()
  userId: string;
}
