import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('repo')
export class Repo extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  repo: string;

  @Column()
  user: string;
}
