import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from "react-native-uuid"

export default class Database {
    async persistMedicine(medicine: any) {

        // medicine.id = uuid.v4().toString()
        // medicine.lastUsageTime = "Não usado"
        // medicine.status = 0
        // medicine.usageCount = 0
        // medicine.usageDays = 0

        medicine.useInterval = medicine.useInterval.getHours()

        await AsyncStorage.setItem("@medicalApp:password", JSON.stringify(medicine))
        console.log(medicine)
        console.log("salvou")
    }
}