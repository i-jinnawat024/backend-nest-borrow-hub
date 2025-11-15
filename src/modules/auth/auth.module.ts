import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';
import {
  ENV_AUTH_JWT_EXPIRES_IN,
  ENV_AUTH_JWT_SECRET,
} from '../../common/config/envs/auth.config.env';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const expiresIn =
          configService.get<number>(ENV_AUTH_JWT_EXPIRES_IN) ?? 3600;

        return {
          secret: configService.getOrThrow(ENV_AUTH_JWT_SECRET),
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
