import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddressPersistent } from '../../../../shared/infrastructure/entitiesDB/addressPersistent';

@Entity({ name: 'CUSTOMER' })
export class CustomerPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column('varchar', {
    name: 'customer_number',
    length: 500,
    nullable: false,
  })
  customerNumber?: string;
  //Cuit o Cuil
  @Column('varchar', { name: 'document_number', length: 25, nullable: false })
  documentNumber?: string;
  @Column('varchar', { name: 'first_name', length: 255, nullable: true })
  firstName?: string;
  @Column('varchar', { name: 'last_name', length: 255, nullable: true })
  lastName?: string;
  @Column('varchar', { name: 'business_name', length: 255, nullable: true })
  businessName?: string;
  @Column('varchar', { length: 255, nullable: true })
  email?: string;
  @Column('simple-array')
  phones?: string[];
  @OneToOne(() => AddressPersistent, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address?: AddressPersistent;
}
