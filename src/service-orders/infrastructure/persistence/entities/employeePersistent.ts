import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SectorPersistent } from './sectorPersistent';
import { User } from 'src/users/domain/user.entity';

@Entity('EMPLOYEE')
export class EmployeePersistent {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    name: 'record_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  recordNumber?: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  firstName?: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  lastName?: string;

  @ManyToOne(() => SectorPersistent, { eager: true })
  @JoinColumn({ name: 'sector_id' })
  sector?: SectorPersistent;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user?: User;
}
