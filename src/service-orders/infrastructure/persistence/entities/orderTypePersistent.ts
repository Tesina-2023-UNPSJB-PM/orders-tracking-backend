import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ORDER_TYPE')
export class OrderTypePersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column('varchar', { length: 50, nullable: false })
  name?: string;
  @Column('varchar', { length: 250, nullable: true })
  description?: string;
}
