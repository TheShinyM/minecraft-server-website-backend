import { Body, Controller, Get, NotFoundException, Param, Patch, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "src/auth/roles/roles.decorator";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { UserRole } from "src/auth/roles/user-role.entity";
import { User } from "src/auth/users.entity";
import { Repository } from "typeorm";
import { RequestWithUser } from "./dto/request-with-user";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(UserRole.ADMIN)
@Controller("users")
export class AdminUsersController {
    public constructor(@InjectRepository(User) private repo: Repository<User>) {}

    @Get()
    public async getAll(@Request() req: RequestWithUser): Promise<User[]> {
        // eslint-disable-next-line prefer-const
        let users: User[] = await this.repo.find();

        users.forEach((user: User) => {
            delete user.passwordHash;
            if (!(req.user.roles === UserRole.ADMIN)) {
                delete user.email;
            }
        });
        return users;
    }

    @Get(":id")
    public async getUser(@Param("id") id: number, @Request() req: RequestWithUser): Promise<User> {
        const user: User = await this.repo.findOneOrFail({ where: { id: id } });

        if (user) {
            if (!req?.user?.isAdmin()) {
                delete user.email;
            }
            return user;
        }
        throw new NotFoundException("User not found");
    }

    @Patch(":id")
    public async updateUser(@Param("id") id: number, @Body() body): Promise<User> {
        const userExists: User = await this.repo.findOneOrFail({ where: { id: id } });
        if (userExists) {
            const updateUser: User = new User({ ...body, id: id });
            return this.repo.save(updateUser);
        }
    }
    // public async updateUser(id: number, body: UpdaterUserDto, req: RequestWithUser): Promise<User[]> {
    //     const user: User = await this.repo.findOneOrFail(id);
    //     if (user) {
    //         if (req.user.isLowerRank(body.roles)) {
    //             await this.repo.update(id, body);
    //             // eslint-disable-next-line prefer-const
    //             let user: User = await this.repo.findOne(id);
    //             if (!req.user.isAdmin()) {
    //                 delete user.email;
    //             }
    //             return user;
    //         }
    //         throw new ForbiddenException();
    //     }
    //     throw new NotFoundException("User does not exist");
    // }
}
