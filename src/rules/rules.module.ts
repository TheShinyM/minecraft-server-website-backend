import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RulesController } from "./rules.controller";
import { Rules } from "./rules.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Rules])],
    controllers: [RulesController]
})
export class RulesModule {}
