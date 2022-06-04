export class DBEvent {
    public id: number;
    public server: string;
    public start: Date;
    public end: Date;
    public size: string;
    public constructor(event?: Partial<DBEvent>) {
        if (event) {
            Object.assign(this, event);
        }
    }
}
