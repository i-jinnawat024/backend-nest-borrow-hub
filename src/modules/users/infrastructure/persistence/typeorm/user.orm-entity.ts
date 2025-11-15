import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRoleOrmEntity } from './user-role.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({
    name: 'tel_number',
    type: 'numeric',
    precision: 15,
    scale: 0,
    nullable: true,
  })
  telNumber: number | null;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date | null;

  @OneToMany(() => UserRoleOrmEntity, (userRole) => userRole.user, {
    cascade: false,
  })
  userRoles?: UserRoleOrmEntity[];
}
