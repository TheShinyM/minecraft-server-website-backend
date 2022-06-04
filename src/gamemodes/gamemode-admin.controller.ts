import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { CreateGamemodeDTO } from "./dto/create-gamemode.dto";
import { UpdateGamemodeDTO } from "./dto/update-gamemode.dto";
import { Gamemode } from "./gamemodes.entity";

@Controller("admin/gamemodes")
export class AdminGamemodesController {
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

    @Post()
    public async createGamemode(@Body() body: CreateGamemodeDTO): Promise<Gamemode> {
        const gm = this.reposito.create(body);
        return await this.reposito.save(gm);
    }

    @Patch(":id")
    public async updateGamemode(@Param("id") id: number, @Body() body: UpdateGamemodeDTO) {
        await getConnection().createQueryBuilder().update(Gamemode).set(body).where("id = :id", { id: id }).execute();
    }

    @Delete(":id")
    public async deleteGamemode(@Param("id") id: number) {
        return await this.reposito.delete(id);
    }
}
