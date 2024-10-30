import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users';
import { OrdersItems } from './ordersItems';

@Entity({ name: 'Orders' })
export class Orders {
  @PrimaryGeneratedColumn({ name: 'orderId' })
  OrderID: number;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  User: Users;

  @OneToMany(() => OrdersItems, (orderItem) => orderItem.Orders)
  OrderItems: OrdersItems[]; // Quan hệ OneToMany tới bảng OrdersItems

  @Column({ name: 'orderDate' })
  OrderDate: string;

  @Column({
    type: 'enum',
    enum: ['InProgress', 'Resolved', 'Closed'],
    default: 'InProgress',
    name: 'status',
  })
  Status: string;

  @Column({ name: 'totalAmount', type: 'decimal', precision: 10, scale: 2 })
  ToTalAmount: number;
}
