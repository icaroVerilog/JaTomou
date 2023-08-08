export declare global {
    export type Medicine = {
        id        : string,
        name      : string,
        usageDays : number,
        currentDay: number,
        status    : number
        usedDays  : Array<string>
    }
}