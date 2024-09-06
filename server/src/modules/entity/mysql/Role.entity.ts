import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleUserEntity } from './RoleUser.entity';

@Entity()
export class RoleEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  role_id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    default: '',
    unique: true,
    charset: 'utf8',
  })
  role_name: string;

  @OneToMany(() => RoleUserEntity, (rolesUser) => rolesUser.user, {
    onDelete: 'CASCADE',
  })
  role_user: RoleUserEntity[];
}
