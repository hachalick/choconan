import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { PresentOrderTableEntity } from './present-order-table.entity';
import { ProductMenuEntity } from './product.entity';

@Entity()
export class FactorPresentOrderEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  factor_present_order_id: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  count: number;

  @ManyToOne(
    () => ProductMenuEntity,
    (products) => products.categoryProductMenu,
    { onDelete: 'CASCADE', onUpdate: 'SET NULL' },
  )
  products: ProductMenuEntity;

  @ManyToOne(
    () => PresentOrderTableEntity,
    (presentOrderTable) => presentOrderTable.factorPresentOrderTable,
    { onDelete: 'CASCADE', onUpdate: 'SET NULL' },
  )
  presentOrderTable: PresentOrderTableEntity;
}
