import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameItem } from "./dto/game-item.entity";
import { AdminGamemodesController } from "./gamemode-admin.controller";
import { GamemodesController } from "./gamemodes.controller";
import { Gamemode } from "./gamemodes.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Gamemode, GameItem])],
    controllers: [GamemodesController, AdminGamemodesController]
})
export class GamemodeModule {}
