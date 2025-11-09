import { Module } from "@nestjs/common";
import { CreateHistoryHandler } from "./commands/handlers/create-history.handler";
import { HistoryController } from "./history.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { HistoryEntity } from "./entities/history.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryRepository } from "./repositories/history.repository";
import { DocumentModule } from "../documents/document.module";
import { DocumentAdapter } from "../documents/adapters/document.adapter";
import { UserModule } from "../users/user.module";

@Module({
    imports:[CqrsModule, DocumentModule, UserModule, TypeOrmModule.forFeature([HistoryEntity])],
    controllers:[HistoryController],
    providers:[CreateHistoryHandler,HistoryRepository]
})
export class HistoryModule {}
