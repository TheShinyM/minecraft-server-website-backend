import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DBEvent } from "./dto/db-event.entity";
import { CreateEventDTO } from "./dto/event.dto";
import { WebsiteEvent } from "./dto/website.event";
export class EventService {
    constructor(@InjectRepository(DBEvent) private repo: Repository<DBEvent>) {}
    public async convertAndCreateEvent(event: CreateEventDTO): Promise<void> {
        const creatingDBEvent = new DBEvent({
            server: event.server,
            start: event.start ? new Date(event.start * 1000) : new Date(),
            end: event.end || event.start ? new Date(event.end ? event.end * 1000 : event.start * 1000) : new Date(),
            size: event?.size ? event?.size : "0"
        });
        await this.repo.save(creatingDBEvent);
    }

    public async createWebEvent(event: WebsiteEvent) {
        const webEvent = new DBEvent(event);
        await this.repo.save(webEvent);
    }
}
