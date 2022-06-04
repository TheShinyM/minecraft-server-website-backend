import { UserRole } from "src/auth/roles/user-role.entity";

export interface AuthDTO {
    token: string;
    name: string;
    roles: UserRole;
}
