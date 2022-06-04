import { NestFactory } from "@nestjs/core";
import * as fs from "fs";
import { AppModule } from "./app.module";

async function bootstrap() {
    // TODO: change path before building
    const httpsOptions = {
        key: fs.readFileSync("./privkey.pem"),
        cert: fs.readFileSync("./cert.pem")
    };
    // key: fs.readFileSync("./secrets/privkey.pem"),
    // cert: fs.readFileSync("./secrets/cert.pem");
    const app = await NestFactory.create(AppModule, {
        httpsOptions
    });
    await app.listen(3000);
}
bootstrap();
