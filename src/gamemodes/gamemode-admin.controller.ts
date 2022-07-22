import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/auth/roles/roles.decorator";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { UserRole } from "src/auth/roles/user-role.entity";
import { Repository } from "typeorm";
import { CreateGamemodeDTO } from "./dto/create-gamemode.dto";
import { UpdateGamemodeDTO } from "./dto/update-gamemode.dto";
import { Gamemode } from "./gamemodes.entity";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.ADMIN)
@Controller("admin/gamemodes")
export class AdminGamemodesController {
    public constructor(@InjectRepository(Gamemode) private reposito: Repository<Gamemode>) {}

    @Get()
    public async findAll(): Promise<Gamemode[]> {
        return await this.reposito.find({ relations: ["gameItems"] });
    }

    @Get(":id")
    public async findOne(@Param("id") id: number): Promise<Gamemode> {
        return await this.reposito.findOneOrFail({ where: { id: id }, relations: ["gameItems"] });
    }

    @Post()
    public async createGamemode(@Body() body: CreateGamemodeDTO): Promise<Gamemode> {
        const gm = this.reposito.create(body);
        return await this.reposito.save(gm);
    }

    @Patch(":id")
    public async updateGamemode(@Param("id") id: number, @Body() body: UpdateGamemodeDTO) {
        const gm: Gamemode = await this.reposito.findOneOrFail({ where: { id: id } });
        if (gm) {
            return await this.reposito.update(id, body);
        }
    }

    @Delete(":id")
    public async deleteGamemode(@Param("id") id: number) {
        return await this.reposito.delete(id);
    }
}
