export type Medicine = {
    id           : number,
    name         : string,
    usageDays    : number,
    usageCount   : number,
    dose         : number,
    doseCategory : string,
    useInterval  : number,
    lastUsageTime: string,
    nextUsageTime: string,
    status       : number
}