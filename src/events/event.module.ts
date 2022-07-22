import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DBEvent } from "./dto/db-event.entity";
import { EventService } from "./event.service";
import { EventsController } from "./events.controller";

@Module({
    imports: [TypeOrmModule.forFeature([DBEvent])],
    controllers: [EventsController],
    providers: [EventService]
})
export class EventModule {}
