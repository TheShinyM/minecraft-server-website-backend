import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DBEvent {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public server: string;

    @Column()
    public start: Date;

    @Column()
    public end: Date;

    @Column()
    public size: string;

    @CreateDateColumn({ readonly: true })
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    public constructor(event?: Partial<DBEvent>) {
        if (event) {
            Object.assign(this, event);
            if (event.createdAt) {
                this.createdAt = event.createdAt;
            }
            if (event.updatedAt) {
                this.updatedAt = event.updatedAt;
            }
            if (event.start) {
                this.start = event.start;
            }
            if (event.end) {
                this.end = event.end;
            }
        }
    }
}
