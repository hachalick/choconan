import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductMenuEntity } from './product.entity';

@Entity()
export class CategoryProductMenuEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  category_product_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  icon: string;

  @OneToMany(
    () => ProductMenuEntity,
    (products) => products.categoryProductMenu,
  )
  products: ProductMenuEntity[];
}
