import { Injectable } from '@nestjs/common';
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

  findById(id: string) {
    return this.repo.findOneBy({
      id,
    });
  }

  findAll() {
    return this.repo.find();
  }
}
