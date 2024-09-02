import { Entity, Column, PrimaryColumn, Generated } from 'typeorm';

@Entity()
export class BlogEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  blog_id: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  publish: boolean;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  meta_title: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  short_description: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    unique: false,
    charset: 'utf8',
  })
  src_banner: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  blog: string;

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
}
