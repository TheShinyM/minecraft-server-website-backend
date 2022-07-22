import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { EventModule } from "./events/event.module";
import { GamemodeModule } from "./gamemodes/gamemodes.module";
import { RulesModule } from "./rules/rules.module";
import { UsersModule } from "./users/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "37.114.47.88",
            port: 3306,
            database: "webseite",
            username: "webUser3",
            password: "n2uCExnqyyouQCjTU86ESvog36y4JfeiFBpbQaQV3gHcDWDJ6RU",
            autoLoadEntities: true,
            synchronize: true
        }),
        GamemodeModule,
        AuthModule,
        EventModule,
        RulesModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
