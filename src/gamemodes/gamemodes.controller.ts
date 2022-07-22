import { Controller, Get, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Gamemode } from "./gamemodes.entity";

@Controller("gamemodes")
export class GamemodesController {
    public constructor(@InjectRepository(Gamemode) private reposito: Repository<Gamemode>) {}

    @Get()
    public async findAll(): Promise<Gamemode[]> {
        // return this.repo.find();
        return await this.reposito.find({ relations: ["gameItems"] });
    }

    @Get(":id")
    public async findOne(@Param("id") id: number): Promise<Gamemode> {
        // return this.repo.findOne(id);
        return await this.reposito.findOneOrFail({ where: { id: id }, relations: ["gameItems"] });
    }
}
