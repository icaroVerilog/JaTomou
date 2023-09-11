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
            useControl: [
                {
                    dayOfWeek: 0,
                    date: "00/00/0000",
                    useTime: "00:00",
                    status: 0
                }
            ]
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
        
        /* updating the used status quando o dia muda */
        var updatedData = data.map(function(medicine){
            const prevUsedDayIndex = medicine.useControl.length - 1
            if (new Date().toLocaleDateString() != medicine.useControl[prevUsedDayIndex].date){

                const currentDate = new Date()

                medicine.status = 0
                medicine.useControl.push({
                    dayOfWeek: currentDate.getDay(),
                    date: currentDate.toLocaleDateString(),
                    useTime: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
                    status: 0
                })


                /* Verifica se atrasou o  dia anterior */
                if (medicine.useControl[prevUsedDayIndex].status == 0){
                    medicine.useControl[prevUsedDayIndex].status = 2
                }

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