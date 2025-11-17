import { Injectable, Logger } from '@nestjs/common';
import { HistoryAdapter } from '../histories/adapters/history.adapter';
import { EHistoryStatus } from '../histories/enums/history-status.enum';
import { DocumentAdapter } from '../documents/adapters/document.adapter';
import { UserAdapter } from '../users/adapters/user.adapter';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);
  constructor(
    private readonly historyAdapter: HistoryAdapter,
    private readonly documentAdapter: DocumentAdapter,
    private readonly userAdapter: UserAdapter,
  ) {}

  async getDashboard() {
    const [histories, documents, users] = await Promise.all([
      this.historyAdapter.getHistoies(EHistoryStatus.BORROWED),
      this.documentAdapter.getDocumentList(),
      this.userAdapter.getUsersCount(),
    ]);
    return {
      totalHistories: histories.length,
      totalDocuments: documents.length,
      totalUser: users,
      histories: histories.sort((a,b)=> b.createdAt.getTime() - a.createdAt.getTime()),
    };
  }
}
