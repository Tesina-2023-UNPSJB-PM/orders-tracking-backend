import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CUSTOMER' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  customerNumber?: string;
  //Cuit o Cuil
  @Column()
  documentNumer: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email?: string;
  @Column()
  phone?: string;
}
