import { NestFactory } from "@nestjs/core";
import * as fs from "fs";
import { AppModule } from "./app.module";

async function bootstrap() {
    // TODO: change path before building
    const httpsOptions = {
        key: fs.readFileSync("./privkey.pem"),
        cert: fs.readFileSync("./fullchain.pem")
    };
    const app = await NestFactory.create(AppModule, {
        httpsOptions,
        cors: true
    });
    await app.listen(3000);
}
bootstrap();
