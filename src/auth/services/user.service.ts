import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users.entity";

@Injectable()
export class UserService {
    public constructor(@InjectRepository(User) public repo: Repository<User>) {}

    public async getByEmail(email: string): Promise<User> {
        const user = await this.getWithEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    public async getWithEmail(email: string): Promise<User> {
        return this.repo.findOne({
            where: [
                {
                    email: email.toLocaleLowerCase()
                }
            ]
        });
    }
    public async throwExceptionIfExist(user, id): Promise<void> {
        if (user.email !== undefined) {
            const uuid = user.uuid;
            const email = user.email;
            const name = user.name;
            const userExists = await this.repo
                .createQueryBuilder()
                .where("user.uuid = :uuid", { uuid })
                .orWhere("user.email = :email", { email })
                .orWhere("user.name = :name", { name })
                .getOneOrFail();
            if (userExists && (id == null || userExists.id !== id)) {
                throw new ConflictException("User already exist");
            }
        }
        if (user.id !== undefined) {
            const userExist = await this.repo.findOne(user.id);
            if (userExist && (id === null || userExist.id !== id)) {
                throw new ConflictException("User already exists");
            }
        }
    }
    public async save(user): Promise<User> {
        return this.repo.save(user);
    }
}
