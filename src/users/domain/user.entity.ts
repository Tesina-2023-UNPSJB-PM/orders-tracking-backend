import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'first_name', length: 255, nullable: true })
  firstName: string;
  @Column({ name: 'last_name', length: 255, nullable: true })
  lastName: string;
  @Column({ name: 'email', length: 150, nullable: true })
  email: string;
  @Column({ name: 'username', length: 150, nullable: false })
  username: string;
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;
  @Column({ type: 'boolean', default: true })
  enabled: boolean;
  @Column({ type: 'boolean', default: false })
  removed: boolean;
}
