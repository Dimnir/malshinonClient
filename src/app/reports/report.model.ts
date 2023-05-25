export class Report {
    public time: Date;
    public place: number;
    public description: string;
    public type: number;
    public id: number;

    constructor(time: Date, place: number, desc: string, type: number, id: number) {
        this.time = time;
        this.place = place;
        this.description = desc;
        this.type = type;
        this.id = id;
    }
}