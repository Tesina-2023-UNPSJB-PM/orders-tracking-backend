import { OrderStatus } from 'src/service-orders/domain/enums/service-order-enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReasonStatusPersistent } from './reasonStatusPersistent';
import { OrderExecutionPersistent } from './orderExecutionPersistent';

@Entity('EXECUTION_HISTORY')
export class ExecutionHistoryPersistent {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => OrderExecutionPersistent, { nullable: false, eager: true })
  @JoinColumn({ name: 'execution_id' })
  execution: OrderExecutionPersistent;

  @Column({ type: 'enum', enum: OrderStatus, nullable: false })
  status: OrderStatus;

  @ManyToOne(() => ReasonStatusPersistent, { nullable: false, eager: true })
  @JoinColumn({ name: 'name_id' })
  reason: ReasonStatusPersistent;

  @Column({ type: 'varchar', nullable: true })
  observations: string;

  @Column({ type: 'text', nullable: true })
  attachments: string;

  @Column({ name: 'registration_date', type: 'timestamp', nullable: false })
  registrationDate: Date;
}
