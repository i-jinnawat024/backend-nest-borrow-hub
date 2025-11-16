import { UserResponseDto } from '../../users/applications/dto/user.response.dto';

export interface LoginResponseDto {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: UserResponseDto;
}
