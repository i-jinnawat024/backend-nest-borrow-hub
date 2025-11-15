import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDomainService } from './domain/services/user-domain.service';
import {
  USER_REPOSITORY,
  UserRepository,
} from './domain/repositories/user.repository';
import { UserController } from './presentation/res/user.controller';
import { TypeormUserRepository } from './infrastructure/persistence/typeorm/typeorm-user.repository';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { RoleOrmEntity } from './infrastructure/persistence/typeorm/roles.orm-entity';
import { UserRoleOrmEntity } from './infrastructure/persistence/typeorm/user-role.orm-entity';
import { GetUsersListHandler } from './applications/queries/handlers/get-users-list.handler';
import { GetUserHandler } from './applications/queries/handlers/get-user.handler';
import { GetUsersCountHandler } from './applications/queries/handlers/get-users-count.handler';
import { CreateUserHandler } from './applications/commands/handlers/create-user.handler';
import { UpdateUserHandler } from './applications/commands/handlers/update-user.handler';
import { DeleteUserHandler } from './applications/commands/handlers/delete-user.handler';
import { UserAdapter } from './adapters/user.adapter';

const queryHandlers = [GetUsersListHandler, GetUserHandler, GetUsersCountHandler];
const commandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserOrmEntity, RoleOrmEntity, UserRoleOrmEntity]),
  ],
  controllers: [UserController],
  providers: [
    TypeormUserRepository,
    ...queryHandlers,
    ...commandHandlers,
    UserAdapter,
    {
      provide: USER_REPOSITORY,
      useExisting: TypeormUserRepository,
    },
    {
      provide: UserDomainService,
      useFactory: (repository: UserRepository) =>
        new UserDomainService(repository),
      inject: [USER_REPOSITORY],
    },
  ],
  exports: [UserDomainService, UserAdapter],
})
export class UserModule {}
