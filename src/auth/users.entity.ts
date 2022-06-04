import { bcrypt } from "bcrypt";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "./roles/user-role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    password: string;

    @Column()
    passwordHash: string;

    @Column()
    roles: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    public constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }

    @BeforeInsert()
    public async refreshPasswordHash(): Promise<void> {
        this.passwordHash = await bcrypt.hash(this.password, 10);
        this.password = undefined;
    }

    public isAdmin(): boolean {
        if (this.roles === UserRole.ADMIN) {
            return true;
        }
        return false;
    }
}
