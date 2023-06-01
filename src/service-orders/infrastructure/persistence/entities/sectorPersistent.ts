import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SECTOR')
export class SectorPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar', length: 80 })
  name: string;
  @Column({ type: 'varchar', length: 250 })
  description?: string;
}
