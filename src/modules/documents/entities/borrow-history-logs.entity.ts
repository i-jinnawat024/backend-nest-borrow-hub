import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('borrow_history_logs')
export class BorrowHistoryLogsOrmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({name:'document_id'})
  documentId: string;

  @Column({name:'user_id'})
  userId: string;

  @Column()
  name:string

  @Column()
  description: string;

  @CreateDateColumn({name:'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({name:'updated_at'})
  updatedAt!: Date; 

  @DeleteDateColumn({name:'deleted_at'})
  deletedAt?: Date;
}