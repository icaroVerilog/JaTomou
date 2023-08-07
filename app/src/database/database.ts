import AsyncStorage              from '@react-native-async-storage/async-storage'
import uuid                      from "react-native-uuid"
import CalculateNextUseTime      from '../services/calculateNextUseTime'
import CalculateCountdown        from '../services/calculateCountdown'

export default class Database {
    async persistMedicine(medicine: any){

        const calculateUsageTime = new CalculateNextUseTime()
        const calculateCountdown = new CalculateCountdown()

        var useTime = new Date()

        if (medicine.useIntervalType == 1){
            useTime = calculateUsageTime.execute(medicine.useTime, 0)
        }
        if (medicine.useIntervalType == 2) {
            useTime = calculateUsageTime.execute(medicine.useTime, medicine.useInterval)
        }
        
        const countdown = calculateCountdown.execute(new Date(), useTime)

        const newMedicine:Medicine = {
            id: uuid.v4().toString(),        
            name: medicine.name,
            usageDays: 0,
            usageCount: 0, 
            useInterval: medicine.useInterval,
            lastUsageTime: new Date(0),
            nextUsageTime: useTime,
            nextUsageCountdown: countdown,
            status: 0
        }

        var a = new Date(0)
        a.toLocaleDateString()
        console.log(a.toLocaleDateString())

        const response = await AsyncStorage.getItem("@medicalApp:medicine")
        const data = response ? JSON.parse(response) : []
        const updatedData = [...data, newMedicine]

        await AsyncStorage.setItem("@medicalApp:medicine", JSON.stringify(updatedData))
    }

    async retrieveMedicines(){
        const response = await AsyncStorage.getItem("@medicalApp:medicine")
        const data = response ? JSON.parse(response): []
        return data
    }

    async deleteMedicine(id: string){
        const response = await AsyncStorage.getItem("@medicalApp:medicine")
        const data:Array<Medicine> = response ? JSON.parse(response): []

        const filteredData = data.filter(objeto => objeto.id !== id);
        await AsyncStorage.setItem("@medicalApp:medicine", JSON.stringify(filteredData))
    }

    async updateMedicine(medicine: Medicine){
        const response = await AsyncStorage.getItem("@medicalApp:medicine")
        const data:Array<Medicine> = response ? JSON.parse(response): []

        var filteredData = data.filter(objeto => objeto.id !== medicine.id);
        filteredData = [...filteredData, medicine]

        await AsyncStorage.setItem("@medicalApp:medicine", JSON.stringify(filteredData))
    }


    async processMedicineTaken(id: string){
        const calculateUsageTime = new CalculateNextUseTime()
        const calculateCountdown = new CalculateCountdown()

        const response = await AsyncStorage.getItem("@medicalApp:medicine")
        const data:Array<Medicine> = response ? JSON.parse(response): []

        const medicine = data.filter(objeto => objeto.id === id)
        const filteredData = data.filter(objeto => objeto.id !== id);

        var nextUsageTime

        if (new Date(medicine[0].lastUsageTime).toLocaleString() == new Date(0).toLocaleString()){
            nextUsageTime = calculateUsageTime.execute(new Date(), medicine[0].useInterval)
        }
        else {
            nextUsageTime = calculateUsageTime.execute(new Date(medicine[0].lastUsageTime), medicine[0].useInterval)
        }

        const updatedMedicine:Medicine = {
            id: medicine[0].id,        
            name: medicine[0].name,
            usageDays: 0,
            usageCount: medicine[0].usageCount + 1, 
            useInterval: medicine[0].useInterval,
            lastUsageTime: new Date(),
            nextUsageTime: nextUsageTime,
            nextUsageCountdown: calculateCountdown.execute(new Date(), nextUsageTime),
            status: 1
        }

        const updatedData = [...filteredData, updatedMedicine]
        await AsyncStorage.setItem("@medicalApp:medicine", JSON.stringify(updatedData))

    }
    
}