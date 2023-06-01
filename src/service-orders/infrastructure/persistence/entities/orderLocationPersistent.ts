import { AddressPersistent } from 'src/shared/infrastructure/entitiesDB/addressPersistent';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ORDER_LOCATION')
export class OrderLocationPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @ManyToOne(() => AddressPersistent)
  @JoinColumn({ name: 'address_id' })
  address: AddressPersistent;
  @Column({ type: 'varchar', length: 250, nullable: true })
  referenceInfo?: string;
}
