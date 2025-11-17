import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { UserDomainService } from '../../users/domain/services/user-domain.service';
import { UserPresenter } from '../../users/applications/presenters/user.presenter';
import { DomainError } from '../../users/domain/errors/domain-error';
import { ENV_AUTH_JWT_EXPIRES_IN } from '../../../common/config/envs/auth.config.env';
import { UserResponseDto } from '../../users/applications/dto/user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userDomainService.validateUserCredentials(
        loginDto.email,
        loginDto.password,
      );

      const primitives = user.toPrimitives();
      const accessToken = await this.jwtService.signAsync({
        sub: primitives.id,
        email: primitives.email,
        role: primitives.role?.name ?? null,
      });

      return {
        accessToken,
        tokenType: 'Bearer',
        expiresIn:
          this.configService.get<number>(ENV_AUTH_JWT_EXPIRES_IN)!,
        user: UserPresenter.toResponse(primitives),
      };
    } catch (error) {
      if (error instanceof DomainError) {
        if (error.message === 'Inactive account') {
          throw new ForbiddenException('Account is inactive');
        }
        throw new UnauthorizedException('Invalid email or password');
      }

      throw error;
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userDomainService.resetPassword(
        resetPasswordDto.email,
        resetPasswordDto.currentPassword,
        resetPasswordDto.newPassword,
      );
      return UserPresenter.toResponse(user.toPrimitives());
    } catch (error) {
      if (error instanceof DomainError) {
        throw new UnauthorizedException('Invalid credentials');
      }

      throw error;
    }
  }
}
