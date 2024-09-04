import { Column, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";
import { FactorPresentOrderEntity } from "./Factor-Present-Order.entity";

@Entity()
export class PresentOrderTableEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  present_order_table_id: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  table: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  busy: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  accept: boolean;

  @OneToMany(
    () => FactorPresentOrderEntity,
    (factorPresentOrderTable) => factorPresentOrderTable.presentOrderTable,
  )
  factorPresentOrderTable: FactorPresentOrderEntity[];
}
