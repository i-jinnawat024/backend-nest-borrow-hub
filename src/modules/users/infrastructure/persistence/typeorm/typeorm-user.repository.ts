import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { User, UserRolePrimitive } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UserId } from "../../../domain/value-objects/user-id.vo";
import { RoleOrmEntity } from "./roles.orm-entity";
import { UserOrmEntity } from "./user.orm-entity";
import { UserRoleOrmEntity } from "./user-role.orm-entity";

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
    @InjectRepository(UserRoleOrmEntity)
    private readonly userRoleRepo: Repository<UserRoleOrmEntity>,
    @InjectRepository(RoleOrmEntity)
    private readonly roleRepo: Repository<RoleOrmEntity>,
  ) {}

  async save(user: User): Promise<void> {
    const entity = this.ormRepo.create(this.toOrm(user));
    await this.ormRepo.save(entity);
  }

  async findById(userId: UserId): Promise<User | null> {
    const entity = await this.ormRepo.findOne({ where: { id: userId.value } });
    if (!entity) {
      return null;
    }

    const rolesMap = await this.buildRolesMap([entity.id]);
    return this.toDomain(entity, rolesMap.get(entity.id));
  }

  async findAll(): Promise<User[]> {
    const entities = await this.ormRepo.find();
    if (!entities.length) {
      return [];
    }

    const rolesMap = await this.buildRolesMap(entities.map((entity) => entity.id));
    return entities.map((entity) => this.toDomain(entity, rolesMap.get(entity.id)));
  }

  private async buildRolesMap(userIds: string[]): Promise<Map<string, UserRolePrimitive | null>> {
    const map = new Map<string, UserRolePrimitive | null>();
    if (!userIds.length) {
      return map;
    }

    const userRoles = await this.userRoleRepo.find({
      where: { userId: In(userIds) },
    });

    if (!userRoles.length) {
      return map;
    }

    const roleIds = Array.from(new Set(userRoles.map((userRole) => userRole.roleId)));
    const roles = await this.roleRepo.find({
      where: { id: In(roleIds) },
    });
    const roleById = new Map(roles.map((role) => [role.id, role]));

    for (const userRole of userRoles) {
      if (map.has(userRole.userId)) {
        continue;
      }

      const role = roleById.get(userRole.roleId);
      map.set(userRole.userId, {
        id: userRole.roleId,
        name: role?.name ?? "unknown",
      });
    }

    return map;
  }

  private toDomain(entity: UserOrmEntity, role?: UserRolePrimitive | null): User {
    return User.fromPrimitives({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
      role: role ?? null,
    });
  }

  private toOrm(user: User): Partial<UserOrmEntity> {
    const primitives = user.toPrimitives();
    return {
      id: primitives.id,
      firstName: primitives.firstName,
      lastName: primitives.lastName,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
      deletedAt: primitives.deletedAt ?? null,
    };
  }
}
