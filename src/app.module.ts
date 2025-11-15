import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './common/config/databases/database.module';
import { UserModule } from './modules/users/user.module';
import { DocumentModule } from './modules/documents/document.module';
import { HistoryModule } from './modules/histories/history.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    DocumentModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
