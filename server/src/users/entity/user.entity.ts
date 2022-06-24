import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
}
