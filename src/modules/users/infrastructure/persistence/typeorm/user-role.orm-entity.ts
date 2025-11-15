import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleOrmEntity } from './roles.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

@Entity('user_roles')
export class UserRoleOrmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'role_id' })
  roleId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @ManyToOne(() => UserOrmEntity, (user) => user.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserOrmEntity;

  @ManyToOne(() => RoleOrmEntity, (role) => role.userRoles, {
    eager: false,
  })
  @JoinColumn({ name: 'role_id' })
  role?: RoleOrmEntity;
}
