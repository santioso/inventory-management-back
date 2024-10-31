import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: 'date' })
  expirationDate: Date;

  @Column({ type: 'varchar', length: 50 })
  status: string; // vigente, por vencer, vencido
}
