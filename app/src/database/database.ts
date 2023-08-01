import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from "react-native-uuid"

export default class Database {
    async persistMedicine(medicine: any){
        const newMedicine:Medicine = {
            id: uuid.v4().toString(),        
            name: medicine.name,
            usageDays: 0,
            usageCount: 0, 
            useInterval: medicine.useInterval,
            lastUsageTime: "N/A",
            nextUsageTime: "N/A",
            status: 0
        }

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
}