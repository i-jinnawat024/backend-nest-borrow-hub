import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UserResponseDto } from '../../users/applications/dto/user.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() body: ResetPasswordDto): Promise<UserResponseDto> {
    return this.authService.resetPassword(body);
  }
}
