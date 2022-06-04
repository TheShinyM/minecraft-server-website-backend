import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminGamemodesController } from "./gamemode-admin.controller";
import { GamemodesController } from "./gamemodes.controller";
import { Gamemode } from "./gamemodes.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Gamemode])],
    controllers: [GamemodesController, AdminGamemodesController]
})
export class GamemodeModule {}
