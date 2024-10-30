import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Products } from './products';
import { OrdersItems } from './ordersItems';

@Entity({ name: 'ProductSizes' })
export class ProductSizes {
  @PrimaryGeneratedColumn({ name: 'productSizeId' })
  ProductSizeID: number;

  @ManyToOne(() => Products, (product) => product.ProductID)
  @JoinColumn({ name: 'productId' })
  ProductID: Products;

  // Add OneToMany relationship to OrdersItems
  @OneToMany(() => OrdersItems, (orderItem) => orderItem.ProductSize)
  OrderItems: OrdersItems[];

  @Column({
    type: 'enum',
    enum: ['Small', 'Medium', 'Large'],
    name: 'size',
  })
  Size: 'Small' | 'Medium' | 'Large';

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  Price: number;
}
