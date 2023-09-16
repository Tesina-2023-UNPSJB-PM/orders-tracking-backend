import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('REASON_STATUS')
export class ReasonStatusPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  description?: string;
}
