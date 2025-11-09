import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDocumentDto {
    @IsNumber()
    @IsNotEmpty()
    documentId: number

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string
}
