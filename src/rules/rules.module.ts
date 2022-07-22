import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminRulesController } from "./admin-rules.controller";
import { RulesController } from "./rules.controller";
import { Rules } from "./rules.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Rules])],
    controllers: [RulesController, AdminRulesController]
})
export class RulesModule {}
