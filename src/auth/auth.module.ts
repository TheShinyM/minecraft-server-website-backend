import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginController } from "./login/login.controllers";
import { RegisterController } from "./register/register.controller";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./services/jwt-strategy";
import { UserService } from "./services/user.service";
import { User } from "./users.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({
            defaultStrategy: "jwt"
        }),
        JwtModule.register({
            secret: "r&^!bj2$DSp4&Wc57tUb",
            signOptions: {
                expiresIn: 43200
            }
        })
    ],
    controllers: [LoginController, RegisterController],
    providers: [AuthService, UserService, JwtStrategy],
    exports: [AuthService, UserService]
})
export class AuthModule {}
