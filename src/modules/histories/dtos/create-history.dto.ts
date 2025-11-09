import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHistoryDto{
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsOptional()
    description:string

    @IsString()
    @IsNotEmpty()
    userId:string
}