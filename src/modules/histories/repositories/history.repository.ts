import { Injectable } from "@nestjs/common";
import {  Repository } from "typeorm";
import { HistoryEntity } from "../entities/history.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class HistoryRepository extends Repository<HistoryEntity>{
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
}