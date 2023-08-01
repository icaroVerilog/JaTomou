export declare global {
    export type Medicine = {
        id            : string,
        name          : string,
        usageDays     : number,
        usageCount    : number,
        useInterval   : number,
        lastUsageTime : string,
        nextUsageTime : string,
        status        : number
    }
}