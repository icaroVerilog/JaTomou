export declare global {
    export type Medicine = {
        id            : string,
        name          : string,
        usageDays     : number,
        usageCount    : number,
        useInterval   : number,
        lastUsageTime : Date | string,
        nextUsageTime : Date | string,
        nextUsageCountdown: string
        status        : number
    }
}