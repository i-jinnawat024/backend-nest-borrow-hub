import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ENV_DB_CORE_URL } from '../../envs/db-core.config.env';

const rootPath = __dirname + '../../../../../modules';
const entities = [join(rootPath, '**', 'entities', '*.entity.{ts,js}')];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.getOrThrow(ENV_DB_CORE_URL),
          entities,
          subscribers: [
            join(rootPath, '**', 'subscribers', '*.subscriber.{ts,js}'),
          ],
          synchronize: false,
          options: {
            encrypt: false,
          },
          logging: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class TypeOrmDatabaseModule {}
