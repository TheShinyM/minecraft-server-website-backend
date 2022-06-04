import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DBEvent } from "./dto/db-event.entity";
import { CreateEventDTO } from "./dto/event.dto";
export class EventService {
    constructor(@InjectRepository(DBEvent) private repo: Repository<DBEvent>) {}
    public async convertAndCreateEvent(event: CreateEventDTO): Promise<void> {
        const creatingDBEvent = new DBEvent({
            server: event.server,
            start: new Date(event.start * 1000),
            end: new Date(
                (event === null || event === void 0 ? void 0 : event.end)
                    ? (event === null || event === void 0 ? void 0 : event.end) * 1000
                    : event.start * 1000
            ),
            size: event?.size ? event?.size : "0"
        });
        await this.repo.save(creatingDBEvent);
    }
}
