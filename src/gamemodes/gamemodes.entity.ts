import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gamemode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    pictureURL: string;

    @Column()
    backgroundURL: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
