import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ADDRESS')
export class AddressPersistent {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column('varchar', { length: 255, nullable: false })
  description: string;
  @Column('varchar', { length: 255, nullable: false })
  city: string;
  @Column('varchar', { name: 'zip_code', length: 50, nullable: true })
  zipCode?: string;
  @Column('varchar', { length: 255, nullable: false })
  state: string;
  @Column('varchar', { length: 255, nullable: false })
  country: string;
  @Column('double precision')
  latitude: number;
  @Column('double precision')
  longitude: number;
}
