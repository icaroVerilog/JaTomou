import { getStatusBarHeight } from "react-native-status-bar-height"
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBarStyle,
    Image,
    Alert,
    Pressable,
    TouchableOpacity,
    FlatList,
    ScrollView,
    StatusBar
} from "react-native";

import MedicineListElement from "./components/medicineListElement"
import MedicineDetail      from "./components/medicineDetailElement"

const data = [
    {
        id: 0,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    },
    {
        id: 1,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    },
    {
        id: 2,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    },
    {
        id: 3,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    },
    {
        id: 4,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    },
    {
        id: 5,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    },
    {
        id: 6,
        name: "Dipirona",
        usageDays: 2,
        usageCount: 10,
        dose: 10,
        doseCategory: "mg",
        useInterval: 24,
        lastUsageTime: "N/A",
        nextUsageTime: "14:00",
        status: 0
    }
]

export default function Main({navigation}: any){
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />
            <View style={styles.profile}>

            </View>
            {/* <MedicineDetail data={data[0]}/> */}
            <View style={styles.medicines}>
                <View style={styles.newMedicine}>
                    <TouchableOpacity style={styles.newMedicineButton} onPress={() => navigation.navigate('NewMedicine')}>
                        {/* <View style={newMedicineButtonStyle.icon}>

                        </View> */}
                        <View style={styles.newMedicineButtonTextContainer}>
                            <Text style={styles.newMedicineButtonText}>
                                Adicionar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.medicineListScroll}
                    data={data}
                    renderItem={({item}) => <MedicineListElement name={item.name} status={"Nao Tomado"} nextUse={"00:00"}/>}
                    // keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        // marginTop: getStatusBarHeight(),
        backgroundColor: "#FFFFFF"
    },
    profile: {
        width: "100%",
        height: "22%",
        backgroundColor: "#77FF00"
    },
    newMedicine: {
        width: "100%",
        height: "14%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffa00"
    },
    newMedicineButton: {
        display: "flex",
        flexDirection: "row",
        width: "60%",
        height: "60%",
        borderRadius: 1000,
        elevation: 3,
        backgroundColor: "#FFFFFF"
    },
    newMedicineButtonTextContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    newMedicineButtonText: {
        fontSize: 25
    },
    medicineListScroll: {
        width: "100%",
        height: "67%",
        backgroundColor: "#AAFF00"
    },
    medicines: {
        width: "100%",
        height: "78%",
        backgroundColor: "red"
    }
})