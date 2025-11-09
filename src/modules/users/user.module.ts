import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserDomainService } from "./domain/services/user-domain.service";
import { USER_REPOSITORY, UserRepository } from "./domain/repositories/user.repository";
import { UserController } from "./presentation/res/user.controller";
import { TypeormUserRepository } from "./infrastructure/persistence/typeorm/typeorm-user.repository";
import { UserOrmEntity } from "./infrastructure/persistence/typeorm/user.orm-entity";
import { RoleOrmEntity } from "./infrastructure/persistence/typeorm/roles.orm-entity";
import { UserRoleOrmEntity } from "./infrastructure/persistence/typeorm/user-role.orm-entity";
import { GetUsersListHandler } from "./applications/queries/handlers/get-users-list.handler";

const queryHandlers = [GetUsersListHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserOrmEntity, RoleOrmEntity, UserRoleOrmEntity]),
  ],
  controllers: [UserController],
  providers: [
    TypeormUserRepository,
    ...queryHandlers,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeormUserRepository,
    },
    {
      provide: UserDomainService,
      useFactory: (repository: UserRepository) => new UserDomainService(repository),
      inject: [USER_REPOSITORY],
    },
  ],
  exports: [UserDomainService,],
})
export class UserModule {}
