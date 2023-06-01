import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  recordNumber: string;
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  firstName: string;
  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  lastName: string;
  @Column({
    name: 'sector_id',
    type: 'integer',
    nullable: false,
  })
  sectorId: number;
}
