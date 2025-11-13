import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  email!: string;

  @IsNumber()
  @IsOptional()
  telNumber?: number | null;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(10)
  password!: string;

  // @IsString()
  // @IsNotEmpty()
  // roleId!: string;
}
