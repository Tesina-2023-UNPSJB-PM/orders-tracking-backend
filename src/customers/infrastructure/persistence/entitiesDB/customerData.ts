import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CUSTOMER' })
export class CustomerData {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  customerNumber: string;
  //Cuit o Cuil
  @Column()
  documentNumber: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email?: string;
  @Column()
  phone?: string;
}
