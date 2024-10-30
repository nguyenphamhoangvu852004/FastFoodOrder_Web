import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Categories' })
export class Categories {
  @PrimaryGeneratedColumn({ name: 'categoryId' })
  CategoryID: number;

  @Column({ unique: true, name: 'categoryName' })
  CategoryName: string;
}
