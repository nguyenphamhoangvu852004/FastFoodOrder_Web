import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Categories } from './categories'; // Đảm bảo bạn import đúng
import { ProductSizes } from './productSizes';
@Entity({ name: 'Products' })
export class Products {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column({ length: 100 })
  ProductName: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @ManyToOne(() => Categories)
  @JoinColumn({ name: 'CategoryID' })
  CategoryID: Categories;

  @Column({ length: 255, nullable: true })
  ImageURL: string;

  @Column({ type: 'boolean', default: true })
  IsActive: boolean;

  // Thiết lập quan hệ với bảng ProductSizes
  @OneToMany(() => ProductSizes, (productSize) => productSize.ProductID)
  ProductSizes: ProductSizes[];
}
