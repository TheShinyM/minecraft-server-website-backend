import { Module } from "@nestjs/common";
import { AuthModuleOptions } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/users.entity";
import { AdminGetMeController } from "./admin-getme.controller";
import { AdminUsersController } from "./admin-users.controller";

@Module({
    imports: [AuthModuleOptions, TypeOrmModule.forFeature([User])],
    controllers: [AdminUsersController, AdminGetMeController]
})
export class UsersModule {}
