import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { RoleUserEntity } from './RoleUser.entity';

@Entity()
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  user_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 150,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 250,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  family: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 250,
    default: '/default.jpg',
    unique: false,
    charset: 'utf8',
  })
  profile: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 3,
    unique: false,
    default: '98',
  })
  national_code: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 12,
    unique: false,
    default: '',
  })
  phone: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @OneToMany(() => RoleUserEntity, (rolesUser) => rolesUser.user, {
    onDelete: 'CASCADE',
  })
  rolesUser: RoleUserEntity[];
}
