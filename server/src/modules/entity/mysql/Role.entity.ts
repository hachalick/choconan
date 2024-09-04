import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
} from 'typeorm';

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
}
