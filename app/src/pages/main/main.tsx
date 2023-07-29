import { getStatusBarHeight } from 'react-native-status-bar-height'
import { ChevronRight } from 'react-native-feather'
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
} from 'react-native';

import MedicineListElement from './components/medicineListElement'
import MedicineDetail      from './components/medicineDetail'

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

export default function Main() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>

            </View>
            <MedicineDetail data={data[0]}/>
            {/* <View style={styles.medicines}>
                <View style={styles.newMedicine}>

                </View>
                <FlatList
                    style={styles.medicineListScroll}
                    data={data}
                    renderItem={({item}) => <MedicineListElement name={item.name} status={"Nao Tomado"} nextUse={"00:00"}/>}
                    // keyExtractor={item => item.id}
                />
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: getStatusBarHeight(),
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
        backgroundColor: '#fffa00'
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
}); 