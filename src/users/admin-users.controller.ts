import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/users.entity";
import { Repository } from "typeorm";
import { RequestWithUser } from "./dto/request-with-user";
export class AdminUsersController {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    public async getAll(req: RequestWithUser): Promise<User[]> {
        // eslint-disable-next-line prefer-const
        let users: User[] = await this.repo.find();
        users.forEach((user) => {
            delete user.passwordHash;
            if (!req.user.isAdmin()) {
                delete user.email;
            }
        });
        return users;
    }
    public async getUser(id: number, req: RequestWithUser): Promise<User> {
        const user: User = await this.repo.findOneOrFail({ where: { id: id } });
        if (user) {
            if (!req.user.isAdmin()) {
                delete user.email;
            }
            return user;
        }
        throw new NotFoundException("User not found");
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
