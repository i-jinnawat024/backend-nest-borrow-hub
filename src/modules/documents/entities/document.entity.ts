import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EDocumentStatus } from "../enums/document-status.enum";

@Entity('documents')
export class DocumentOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"document_id"})
  documentId: number;

  @Column({name:'first_name'})
  firstName:string

  @Column({name:'last_name'})
  lastName:string

  @Column()
  status: EDocumentStatus

  @CreateDateColumn({name:'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name:'deleted_at'})
  deletedAt?: Date;
}