import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderTypePersistent } from './orderTypePersistent';
import {
  OrderPriority,
  OrderStatus,
} from 'src/service-orders/domain/enums/service-order-enums';
import { OrderLocationPersistent } from './orderLocationPersistent';
import { OrderExecutionPersistent } from './orderExecutionPersistent';

@Entity('SERVICE_ORDER')
export class ServiceOrderPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column('varchar', { length: 50, nullable: false })
  number?: string;
  @Column('varchar', { length: 250, nullable: true })
  description?: string;
  @ManyToOne(() => OrderTypePersistent)
  @JoinColumn({ name: 'type_id' })
  type: OrderTypePersistent;
  @Column({ type: 'enum', enum: OrderStatus })
  status?: OrderStatus;
  @Column({ type: 'enum', enum: OrderPriority })
  priority?: OrderPriority;
  @Column('integer')
  customerId?: number;
  @OneToOne(() => OrderLocationPersistent)
  @JoinColumn({ name: 'order_location_id' })
  destination?: OrderLocationPersistent;
  @OneToOne(() => OrderExecutionPersistent)
  @JoinColumn({ name: 'excetution_id' })
  execution?: OrderExecutionPersistent;
  @CreateDateColumn({ name: 'creationTime' })
  creationTime?: Date;
  @Column({ type: 'json' })
  detail?: object;
}
