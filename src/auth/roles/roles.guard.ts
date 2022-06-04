import { CanActivate, InternalServerErrorException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "../users.entity";
export class RolesGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handlerRoles = this.makeStringArray(this.reflector.get("roles", context.getHandler()) || "");
        const classRoles = this.makeStringArray(this.reflector.get("roles", context.getClass()) || "");
        const roles = [...classRoles, ...handlerRoles];
        if (!roles || roles.length <= 0) {
            return true;
        }
        const req = context.getType() === "ws" ? context.switchToWs().getClient() : context.switchToHttp().getRequest();
        if (!(req.user instanceof User)) {
            throw new InternalServerErrorException("Rollen");
        }
        const user = req.user;
        if (!user.roles) {
            return false;
        }
        return user && user.roles && this.hasRole(user, roles);
    }
    hasRole(user, roles) {
        for (const role of user.roles) {
            if (roles.includes(role)) {
                return true;
            }
        }
        return false;
    }
    makeStringArray(makingString) {
        return makingString.split(";");
    }
}
