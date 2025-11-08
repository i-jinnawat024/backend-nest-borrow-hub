import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateDocumentDto {
    @IsNumber()
    @IsNotEmpty()
    documentId: number

    @IsString()
    @IsNotEmpty()
    documentName: string
}
