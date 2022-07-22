import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/roles/roles.decorator";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { UserRole } from "src/auth/roles/user-role.entity";
import { User } from "src/auth/users.entity";
import { RequestWithUser } from "./dto/request-with-user";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.ADMIN)
@Controller("getme")
export class AdminGetMeController {
    public constructor() {}

    @Get()
    public async getAll(@Request() req: RequestWithUser): Promise<User> {
        delete req.user.passwordHash;
        return req.user;
    }
}
