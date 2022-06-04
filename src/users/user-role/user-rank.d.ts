import { UserRole } from "src/auth/roles/user-role.entity";
export declare class RoleCompare {
    compareRole(userRole: UserRole, comparedRole: UserRole, under: boolean): boolean;
}
