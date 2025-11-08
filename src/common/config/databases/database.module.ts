import { Module } from "@nestjs/common";
import { TypeOrmDatabaseModule } from "./typeorm/typeorm.module";

@Module({
    imports: [TypeOrmDatabaseModule],
})
export class DatabaseModule {}