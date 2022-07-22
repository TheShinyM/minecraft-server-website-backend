import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GameItem } from "./dto/game-item.entity";

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
    rules: string;

    @OneToMany(() => GameItem, (gameItem: GameItem) => gameItem.gamemode)
    gameItems: GameItem[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
