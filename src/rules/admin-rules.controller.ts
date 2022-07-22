import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/auth/roles/roles.decorator";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { UserRole } from "src/auth/roles/user-role.entity";
import { Repository } from "typeorm";
import { UpdateRuleDTO } from "./dto/updateRule.dto";
import { Rules } from "./rules.entity";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.ADMIN)
@Controller("admin/rules")
export class AdminRulesController {
    public constructor(@InjectRepository(Rules) private ruleRepo: Repository<Rules>) {}

    @Get()
    public async getRules(): Promise<Rules[]> {
        return await this.ruleRepo.find();
    }

    @Post()
    public async createRule(@Body() body: Partial<Rules>): Promise<Rules> {
        const createdRule = await this.ruleRepo.create(body);
        return this.ruleRepo.save(createdRule);
    }

    @Patch(":id")
    public async updateRule(@Param("id") id: number, @Body() body: UpdateRuleDTO): Promise<Rules> {
        const rule: Rules = await this.ruleRepo.findOneOrFail({ where: { id: id } });
        if (rule) {
            await this.ruleRepo.update(id, body);
            return this.ruleRepo.findOne({ where: { id: id } });
        }
        new NotFoundException("Rule could not be found");
    }
}
