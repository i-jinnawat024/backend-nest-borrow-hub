import { BadRequestException, Injectable } from '@nestjs/common';
import { DocumentOrmEntity } from '../entities/document.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DocumentRepository extends Repository<DocumentOrmEntity> {
  constructor(
    @InjectRepository(DocumentOrmEntity)
    private readonly repo: Repository<DocumentOrmEntity>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  findById(id: number) {
    return this.repo.findOneBy({
      id,
    });
  }

  findAll() {
    return this.repo.find();
  }

  insertDocument(document: DocumentOrmEntity) {
    const result = this.repo.create(document);
    return this.repo.save(result);
  }

  updateDocument(document: Partial<DocumentOrmEntity>) {
    if (!document.id) {
      throw new BadRequestException('document.id is required for update');
    }
    const patch: Partial<DocumentOrmEntity> = {};
    if (document.documentId !== undefined)
      patch.documentId = document.documentId;
    if (document.firstName !== undefined) patch.firstName = document.firstName;
    if (document.lastName !== undefined) patch.lastName = document.lastName;
    if (document.status !== undefined) patch.status = document.status;

    if (Object.keys(patch).length === 0) {
      return;
    }

    return this.repo.update(document.id, patch);
  }
}
