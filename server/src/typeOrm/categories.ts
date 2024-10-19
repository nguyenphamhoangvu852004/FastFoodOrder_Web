import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Categories' })
export class Categories {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column({ length: 50, unique: true })
  CategoryName: string;
}
