import {
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';
import { RoleEntity } from './Role.entity';

@Entity()
export class RoleUserEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  role_user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.rolesUser, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToOne(() => RoleEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: RoleEntity;
}
