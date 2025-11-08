import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/config/databases/database.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [ConfigModule,DatabaseModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
