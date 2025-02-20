import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateRuleDTO } from "./dto/updateRule.dto";
import { Rules } from "./rules.entity";

@Controller("rules")
export class RulesController {
    public constructor(@InjectRepository(Rules) private ruleRepo: Repository<Rules>) {}

    @Get()
    public async getRules(): Promise<Rules[]> {
        // let rulesString: string;
        // let rulesArray: string [] = rulesString.split(";") as string[];
        return this.ruleRepo.find();
    }

    @Post()
    public async createRule(@Body() body: Partial<Rules>): Promise<Rules> {
        const createdRule: Rules = await this.ruleRepo.create(body);

        return this.ruleRepo.save(createdRule);
    }

    @Patch(":id")
    public async updateRule(@Param("id") id: number, @Body() body: UpdateRuleDTO): Promise<Rules> {
        await this.ruleRepo.update(id, body);

        return this.ruleRepo.findOneOrFail({ where: { id: id } });
    }
}
