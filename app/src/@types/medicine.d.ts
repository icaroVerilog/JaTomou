export declare global {

    export type UseControlData = {
        dayOfWeek: number,
        date: string,
        useTime: string,
        status: number,
    }

    export type Medicine = {
        id        : string,
        name      : string,
        usageDays : number,
        currentDay: number,
        status    : number
        useControl: Array<UseControlData>
    }
}