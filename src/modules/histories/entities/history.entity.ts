import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EHistoryStatus } from '../enums/history-status.enum';

@Entity('borrow_history_logs')
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'document_id' })
  documentId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  status: EHistoryStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
