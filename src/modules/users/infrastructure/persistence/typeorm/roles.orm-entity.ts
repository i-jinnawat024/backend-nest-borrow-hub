import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { UserRoleOrmEntity } from "./user-role.orm-entity";

@Entity({ name: "roles" })
export class RoleOrmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt?: Date;

  @OneToMany(() => UserRoleOrmEntity, (userRole) => userRole.role)
  userRoles?: UserRoleOrmEntity[];
}
