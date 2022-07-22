import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gamemode } from "../gamemodes.entity";

@Entity()
export class GameItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    img: string;

    @ManyToOne(() => Gamemode, (gamemode: Gamemode) => gamemode.gameItems, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    gamemode: Gamemode;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
