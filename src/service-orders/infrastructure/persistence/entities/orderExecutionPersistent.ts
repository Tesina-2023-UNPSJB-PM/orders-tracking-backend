import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeePersistent } from './employeePersistent';
import { SectorPersistent } from '../entities/sectorPersistent';

@Entity('ORDER_EXECUTION')
export class OrderExecutionPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar', nullable: true })
  observations?: string;
  @ManyToOne(() => EmployeePersistent)
  @JoinColumn({ name: 'employee_id' })
  executor?: EmployeePersistent;
  @ManyToOne(() => SectorPersistent)
  @JoinColumn({ name: 'sector_id' })
  assignedSector?: SectorPersistent;
  @Column({ name: 'assigned_time', type: 'timestamp' })
  assignedTime?: Date;
  @Column({ name: 'estimated_resolution_time', type: 'timestamp' })
  estimatedResolutionTime?: Date;
  @Column({ name: 'resolution_time', type: 'timestamp' })
  resolutionTime?: Date;
}
