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

import Database from "../../database/database";
import MedicineListElement from "./components/medicineListElement"
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";



export default function Main({navigation}: any){

    const database = new Database()

    const [data, setData] = useState<Medicine[]>([])

    async function handleFetchData(){
        const data = await database.retrieveMedicines()
        setData(data)
    }

    useFocusEffect(useCallback(() => {
        handleFetchData()
    },[]))


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#F2F2F2" />
            <View style={styles.profile}>

            </View>
            <View style={styles.medicines}>
                <View style={styles.newMedicine}>
                    <TouchableOpacity style={styles.newMedicineButton} onPress={() => navigation.navigate("NewMedicine")}>
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
                    renderItem={({item}) => <MedicineListElement data={item} navigation={navigation}/>}
                    keyExtractor={item => item.id}
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
        backgroundColor: "#FFFFFF"
    },
    profile: {
        width: "100%",
        height: "22%",
        backgroundColor: "#F2F2F2"
    },
    newMedicine: {
        width: "100%",
        height: "14%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
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
        paddingTop: "4%",
        paddingBottom: "5%",
        backgroundColor: "#F2F2F2"
    },
    medicines: {
        width: "100%",
        height: "78%",
    }
})