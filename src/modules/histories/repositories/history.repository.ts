import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HistoryEntity } from '../entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EHistoryStatus } from '../enums/history-status.enum';

@Injectable()
export class HistoryRepository extends Repository<HistoryEntity> {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly repo: Repository<HistoryEntity>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  insertDocumentHistory(history: Partial<HistoryEntity>) {
    const result = this.repo.create(history);
    return this.repo.save(result);
  }
  updateDocumentHistory(documentId: number, userId: string) {
    return this.repo.update(
      { documentId, userId },
      { status: EHistoryStatus.RETURNED },
    );
  }

  hasBorrowedDocument(documentId: number, userId: string) {
    return this.repo.existsBy({
      documentId,
      userId,
      status: EHistoryStatus.BORROWED,
    });
  }

  findAll() {
    return this.repo.find();
  }

  findByStatus(status: EHistoryStatus) {
    return this.repo.findBy({
      status,
    });
  }
  findByUserId(userId: string) {
    return this.repo.findBy({
      userId,
    });
  }
  findByDocumentId(documentId: number) {
    return this.repo.findBy({
      documentId,
    });
  }

  countMonthlyTransactions(year: number, month: number) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    return this.repo
      .createQueryBuilder('history')
      .where('history.created_at >= :start', { start: startDate })
      .andWhere('history.created_at < :end', { end: endDate })
      .andWhere('history.deleted_at IS NULL')
      .getCount();
  }
}
