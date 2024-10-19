import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from './products';

@Entity({ name: 'ProductSizes' })
export class ProductSizes {
  @PrimaryGeneratedColumn()
  ProductSizeID: number;

  @ManyToOne(() => Products, (product) => product.ProductSizes)
  @JoinColumn({ name: 'ProductID' })
  ProductID: Products;

  @Column({
    type: 'enum',
    enum: ['Small', 'Medium', 'Large'],
  })
  Size: 'Small' | 'Medium' | 'Large';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Price: number;
}
