import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateEventDTO } from "./dto/event.dto";
import { WebsiteEvent } from "./dto/website.event";
import { EventService } from "./event.service";

@Controller("events")
export class EventsController {
    public constructor(private eventService: EventService) {}

    @Post()
    public createEvent(@Body() event: CreateEventDTO): void {
        this.eventService.convertAndCreateEvent(event);
    }

    @Post("website")
    public websiteEvent(@Body() event: WebsiteEvent) {
        console.log(event);

        this.eventService.createWebEvent(event);
    }

    @Get()
    public liveTest(): string {
        return "Events laufen";
    }
}
