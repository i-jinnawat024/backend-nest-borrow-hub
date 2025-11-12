import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName!: string;
}
