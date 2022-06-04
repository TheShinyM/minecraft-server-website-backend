import { Controller, Get, Post } from "@nestjs/common";
import { CreateEventDTO } from "./dto/event.dto";
import { EventService } from "./event.service";

@Controller("events")
export class EventsController {
    public constructor(private eventService: EventService) {}

    @Post()
    public createEvent(event: CreateEventDTO): void {
        this.eventService.convertAndCreateEvent(event);
    }

    @Get()
    public liveTest(): string {
        return "Events laufen";
    }
}
