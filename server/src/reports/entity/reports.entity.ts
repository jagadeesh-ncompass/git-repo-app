import { User } from 'src/users/entity/user.entity';
import {BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity('reports')
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reports, {
    nullable: false,
  })
  @JoinTable()
  user: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column({ type: 'year' })
  year: Date;

  @Column()
  mileage: number;

  @Column({
    default: false,
  })
  approved: boolean;
}
