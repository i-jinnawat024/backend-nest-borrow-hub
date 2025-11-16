import { Controller, Get, Logger } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { HistoryAdapter } from '../histories/adapters/history.adapter';

@Controller('dashboard')
export class DashboardController {
  private readonly logger = new Logger(DashboardController.name);
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get()
  async getDashboard() {
    return await this.dashboardService.getDashboard();
  }
}
