import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthDTO } from "../login/dtos/auth.dto";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    public constructor(private readonly jwtService: JwtService, private userService: UserService) {}

    public async login(email: string, password: string): Promise<AuthDTO> {
        if (email && password) {
            const user = await this.userService.getByEmail(email);
            const id = user.id;
            const passwordMatches = await this.comparePassword(user.passwordHash, password);
            if (!passwordMatches) {
                throw new UnauthorizedException("Wrong Login");
            }
            return { token: this.jwtService.sign({ id }), name: user.name, roles: user.roles };
        }
    }
    public comparePassword(passwordHash, passwordToTest) {
        return bcrypt.compare(passwordToTest, passwordHash);
    }
}
