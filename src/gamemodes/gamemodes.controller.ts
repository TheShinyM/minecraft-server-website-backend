import { Controller, Get, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Gamemode } from "./gamemodes.entity";

@Controller("gamemodes")
export class GamemodesController {
    // public repo = new Repository<Gamemode>();

    public constructor(@InjectRepository(Gamemode) private reposito: Repository<Gamemode>) {}

    @Get()
    public async findAll(): Promise<Gamemode[]> {
        // return this.repo.find();
        return await this.reposito.find();
    }

    @Get(":id")
    public async findOne(@Param("id") id: number): Promise<Gamemode> {
        // return this.repo.findOne(id);
        return await this.reposito.findOneOrFail({ where: { id: id } });
    }

    // @Post()
    // public async createGamemode(@Body() body: CreateGamemodeDTO): Promise<Gamemode> {
    //     const gm = this.reposito.create(body);
    //     return await this.reposito.save(gm);
    // }
}
