import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { OrdersItems } from './ordersItems';
import { Categories } from './categories';

@Entity({ name: 'Products' })
export class Products {
  @PrimaryGeneratedColumn({ name: 'productID' })
  ProductID: number;

  @Column({ name: 'productName' })
  ProductName: string;

  @Column({ nullable: true, name: 'description' })
  Description: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'categoryID' })
  CategoryID: Categories;

  @Column({ nullable: true, name: 'imageURL' })
  ImageURL: string;

  @Column({ type: 'boolean', default: true, name: 'isActive' })
  IsActive: boolean;

  // Mối quan hệ với bảng OrdersItems
  @OneToMany(() => OrdersItems, (orderItem) => orderItem.Products)
  OrderItems: OrdersItems[]; // Thêm OrderItems
}
