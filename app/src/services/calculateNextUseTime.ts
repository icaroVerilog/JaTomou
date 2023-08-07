export default class CalculateNextUseTime {
    execute(date:Date, hours: any){
        return new Date(new Date(date).setHours(date.getHours() + hours))
    }
}