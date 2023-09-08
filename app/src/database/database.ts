import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from "react-native-uuid"

export default class Database {
    async persistMedicine(medicine: any){
        const newMedicine:Medicine = {
            id: uuid.v4().toString(),        
            name: medicine.name,
            usageDays: 0,
            currentDay: new Date().getDay(),
            status: 0,
            usedDays: [],
            useControl: []
        }

        const response = await AsyncStorage.getItem("@medicalApp2:medicine")
        const data = response ? JSON.parse(response) : []
        const updatedData = [...data, newMedicine]

        await AsyncStorage.setItem("@medicalApp2:medicine", JSON.stringify(updatedData))
    }

    async retrieveMedicines(){
        const response = await AsyncStorage.getItem("@medicalApp2:medicine")
        const data = response ? JSON.parse(response): []
        return data
    }

    async deleteMedicine(id: string){
        const response = await AsyncStorage.getItem("@medicalApp2:medicine")
        const data:Array<Medicine> = response ? JSON.parse(response): []

        const filteredData = data.filter(objeto => objeto.id !== id);
        await AsyncStorage.setItem("@medicalApp2:medicine", JSON.stringify(filteredData))
    }

    async updateMedicine(medicine: Medicine){
        const response = await AsyncStorage.getItem("@medicalApp2:medicine")
        const data:Array<Medicine> = response ? JSON.parse(response): []

        var filteredData = data.filter(objeto => objeto.id !== medicine.id);
        filteredData = [...filteredData, medicine]

        await AsyncStorage.setItem("@medicalApp2:medicine", JSON.stringify(filteredData))
    }

    async updateData(){
        const response = await AsyncStorage.getItem("@medicalApp2:medicine")
        const data:Array<Medicine> = response ? JSON.parse(response): []
        
        const updatedData = data.map(function(medicine){
            const prevUsedDay = medicine.usedDays[medicine.usedDays.length - 1]
            if (new Date().toLocaleDateString() != prevUsedDay){
                medicine.status = 0
                return medicine
            }
            else {
                return medicine
            }
        })

        await AsyncStorage.setItem("@medicalApp2:medicine", JSON.stringify(updatedData))
    }

    async handleFirstUse():Promise<boolean>{
        const response = await AsyncStorage.getItem("@medicalApp2:userData")

        if (response == null){
            await AsyncStorage.setItem("@medicalApp2:userData", JSON.stringify(1))
            return false
        }
        else {
            return true
        }
    }
}