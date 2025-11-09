import { Module } from "@nestjs/common";
import { CreateHistoryHandler } from "./commands/handlers/create-history.handler";
import { HistoryController } from "./history.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { HistoryEntity } from "./entities/history.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryRepository } from "./repositories/history.repository";
import { HistoryAdapter } from "./adapters/history.adapter";

@Module({
    imports:[CqrsModule, TypeOrmModule.forFeature([HistoryEntity])],
    controllers:[HistoryController],
    providers:[CreateHistoryHandler,HistoryRepository,HistoryAdapter],
    exports:[HistoryAdapter]
})
export class HistoryModule {}
