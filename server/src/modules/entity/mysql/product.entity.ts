import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { FactorPresentOrderEntity } from './factor-present-order.entity';
import { CategoryProductMenuEntity } from './category-product.entity';

@Entity()
export class ProductMenuEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  product_id: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  id: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  available: boolean;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  waiting: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  meta_title: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  meta_description: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  src: string;

  @ManyToOne(
    () => CategoryProductMenuEntity,
    (categoryProduct) => categoryProduct.products,
    { onDelete: 'CASCADE' },
  )
  categoryProductMenu: CategoryProductMenuEntity;

  @OneToMany(
    () => FactorPresentOrderEntity,
    (detailsPresentOrder) => detailsPresentOrder.presentOrderTable,
    { onDelete: 'SET NULL' },
  )
  detailsPresentOrder: FactorPresentOrderEntity[];
}
