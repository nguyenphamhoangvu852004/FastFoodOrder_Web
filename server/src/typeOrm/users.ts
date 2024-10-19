import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Users' })
export class Users {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ length: 50, unique: true })
  Username: string;

  @Column({ length: 100, unique: true })
  Email: string;

  @Column({ length: 255 })
  PasswordHash: string;

  @Column({ length: 100 })
  FullName: string;

  @Column({ length: 20, nullable: true })
  PhoneNumber: string;

  @Column({ type: 'text', nullable: true })
  Address: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ type: 'boolean', default: false })
  IsAdmin: boolean;
}

