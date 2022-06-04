import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Rules {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "longtext" })
    rules: string;

    @CreateDateColumn({ readonly: true })
    createdAt: Date;

    @UpdateDateColumn({ readonly: true })
    updatedAt: Date;
}
