export declare global {
    export type Medicine = {
        id?          : string,
        name?         : string,
        usageDays?    : number,
        usageCount?   : number,
        // dose         : number,
        // doseCategory : string,
        useInterval?  : number,
        lastUsageTime?: string,
        nextUsageTime?: string,
        status?       : number
    }
}