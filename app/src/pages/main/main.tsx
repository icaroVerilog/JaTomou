import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    TouchableOpacity,
    FlatList,
    StatusBar
} from "react-native";

import Database from "../../database/database";
import MedicineListElement from "./components/medicineListElement"
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import reminder from "../../../assets/icons/general/reminder.png"



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
        <>
            <StatusBar barStyle="light-content" backgroundColor="#F2F2F2" />
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Text style={[styles.profileText, (data.length == 0? {display: "none"}: {display: "flex"})]}>
                        Olá, não esqueça seus medicamentos
                    </Text>
                    <Text style={[styles.profileText, (data.length == 0? {display: "flex"}: {display: "none"})]}>
                        Nunca foi tão facil lembrar se você tomou seus medicamentos diários
                    </Text>
                </View>
                <View style={styles.medicines}>
                    <View style={styles.newMedicine}>
                        <TouchableOpacity style={styles.newMedicineButton} onPress={() => navigation.navigate("NewMedicine")} activeOpacity={0.7}>
                            <View style={styles.newMedicineButtonTextContainer}>
                                <Text style={styles.newMedicineButtonText}>
                                    Adicionar lembrete
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.medicineListPlaceholder, (data.length == 0? {display: "flex"}: {display: "none"})]}>
                        <Image style={styles.placeholderImage} source={reminder}/>
                    </View> 
                    <FlatList
                        style={[styles.medicineListScroll, (data.length == 0? {display: "none"}: {display: "flex"})]}
                        data={data}
                        renderItem={({item}) => <MedicineListElement data={item} navigation={navigation}/>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#F2F2F2",
    },
    profile: {
        width: "100%",
        height: "22%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%",
        backgroundColor: "#F2F2F2"
    },
    profileText: {
        fontSize: 25,
        textAlign: "center"
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
        fontSize: 20
    },
    medicineListScroll: {
        width: "100%",
        height: "86%",
        paddingTop: "4%",
        paddingBottom: "5%",
        backgroundColor: "#F2F2F2"
    },
    medicineListPlaceholder: {
        width: "100%",
        height: "86%",
        paddingTop: "4%",
        paddingBottom: "5%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2"
    },
    placeholderImage: {
        width: "70%",
        height: "40%",
        resizeMode: "contain",
        opacity: 0.2,
        marginBottom: "30%"
    },
    medicines: {
        width: "100%",
        height: "78%",
    }
})