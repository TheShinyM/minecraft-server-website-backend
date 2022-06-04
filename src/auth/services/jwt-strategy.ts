import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { PayloadDTO } from "../login/dtos/payload.dto";
import { User } from "../users.entity";
declare const JwtStrategy_base: new (...args: any[]) => any;
export class JwtStrategy extends JwtStrategy_base {
    public constructor(private readonly userRepo: Repository<User>) {
        super(userRepo);
    }

    private static getTokenFromHeader(req) {
        const auth = req.headers.authorization;
        return auth ? auth.replace("Bearer ", "") : undefined;
    }
    public async validate(payload: PayloadDTO): Promise<User> {
        return this.userRepo.findOneOrFail({ where: { id: payload.id } }).catch(() => {
            throw new BadRequestException("User not found");
        });
    }
}
export {};
