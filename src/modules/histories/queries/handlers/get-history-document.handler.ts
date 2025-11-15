import { DocumentAdapter } from './../../../documents/adapters/document.adapter';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HistoryEntity } from '../../entities/history.entity';
import { HistoryRepository } from '../../repositories/history.repository';
import { GetHistoryDocumentQuery } from '../impl/get-history-document.query';
import { UserDomainService } from '../../../users/domain/services/user-domain.service';
import { UserId } from '../../../users/domain/value-objects/user-id.vo';

@QueryHandler(GetHistoryDocumentQuery)
export class GetHistoryDocumentHandler
  implements IQueryHandler<GetHistoryDocumentQuery>
{
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly userDomainService: UserDomainService,
    private readonly documentAdapter: DocumentAdapter,
  ) {}

  private async buildUserMap(histories: HistoryEntity[]): Promise<
    Map<string, { firstName: string; lastName: string }>
  > {
    const uniqueUserIds = Array.from(
      new Set(
        histories
          .map((history) => history.userId)
          .filter((userId): userId is string => Boolean(userId)),
      ),
    );

    const map = new Map<string, { firstName: string; lastName: string }>();
    await Promise.all(
      uniqueUserIds.map(async (userId) => {
        try {
          const user = await this.userDomainService.getUserById(UserId.create(userId));
          map.set(userId, {
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } catch {
          map.set(userId, {
            firstName: '',
            lastName: '',
          });
        }
      }),
    );

    return map;
  }

private async transformToResponse(history: HistoryEntity[]): Promise<any[]> {
  const userMap = await this.buildUserMap(history);

  const result = await Promise.all(
    history.map(async (item) => {
      const user = userMap.get(item.userId);
      const firstName = user?.firstName ?? '';
      const lastName = user?.lastName ?? '';
      const document = await this.documentAdapter.getDocumentById(item.documentId);

      return {
        id: item.id,
        userId: item.userId,
        document: {
          id: document.id,
          documentId: document.documentId,
          firstName: document.firstName,
          lastName: document.lastName,
          status: document.status,
          createdAt: document.createdAt,
          updatedAt: document.updatedAt,
          deletedAt: document.deletedAt,
        },
        name: item.name,
        description: item.description || null,
        status: item.status,
        createdAt: item.createdAt,
      };
    })
  );

  return result;
}


  async execute(query: GetHistoryDocumentQuery): Promise<any> {
    if (!query.query.documentId) return [];
    const histories = await this.historyRepository.findByDocumentId(query.query.documentId);
    const result = await this.transformToResponse(histories);
    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
