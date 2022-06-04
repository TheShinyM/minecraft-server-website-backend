import { Module } from "@nestjs/common";
import { AuthModuleOptions } from "@nestjs/passport";
import { AdminUsersController } from "./admin-users.controller";

@Module({
    imports: [AuthModuleOptions],
    controllers: [AdminUsersController]
})
export class UsersModule {}
