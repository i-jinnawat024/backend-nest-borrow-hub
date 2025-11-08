import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { DatabaseModule } from './databases/database.module';
import coreConfigEnv from './envs/db-core.config.env';


@Module({
  imports: [
    BaseConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
       coreConfigEnv
      ],
      envFilePath: ['.env', '.env.dev','.env.development.local'],
    }),
    DatabaseModule,
  ],
})
export class ConfigModule {}
