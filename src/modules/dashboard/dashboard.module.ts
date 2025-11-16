import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../users/user.module';
import { HistoryModule } from '../histories/history.module';
import { DashboardService } from './dashboard.service';
import { DocumentModule } from '../documents/document.module';

@Module({
  imports: [CqrsModule, UserModule, HistoryModule, DocumentModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
