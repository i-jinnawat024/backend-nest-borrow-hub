import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EDocumentStatus } from "../enums/document-status.enum";

@Entity('documents')
export class DocumentOrmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({name:"document_id"})
  documentId: string;

  @Column({name:'document_name'})
  documentName: string;

  @Column()
  status: EDocumentStatus

  @CreateDateColumn({name:'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({name:'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name:'deleted_at'})
  deletedAt?: Date;
}