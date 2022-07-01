import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Repo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    repository_name: string;

    @Column()
    repository_url: string;

    @Column()
    contributors: number;
    @Column()
    email: string;
}