import React                from "react"
import { useState }         from "react"
import { useEffect }        from "react"
import { StyleSheet }       from "react-native"
import { Text }             from "react-native"
import { View }             from "react-native"
import { Image }            from "react-native"
import { TouchableOpacity } from "react-native"
import { StatusBar }        from "react-native"
import { Animated }         from "react-native"

import UseCalendar          from "./components/useScheduler"

import RighArrow            from "../../../assets/icons/general/right-arrow.png"
import Trash                from "../../../assets/icons/general/trash.png"
import Medicine             from "../../../assets/icons/medicine/med3.png"
import DeleteAnimation      from "../../components/deleteAnimation"

import Database             from "../../database/database"


export default function MedicineDetail({ route, navigation }:any) {

    const database = new Database()

    const [animationState, setAnimationState] = useState<boolean>(false)
    const [backgroundColor] = useState(new Animated.Value(0))
    const [animationRunning, setAnimationRunning] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)

    const [medicineData, setMedicineData] = useState<Medicine>({
        id           : "",
        name         : "Medicine",
        usageDays    : 0,
        currentDay   : 0,
        status       : 0,
        useControl   : []
    })

    useEffect(() =>{
        setMedicineData(
            {
                id: route.params.id,
                name: route.params.name,
                usageDays: JSON.parse(route.params.usageDays),
                currentDay: JSON.parse(route.params.currentDay),
                status: JSON.parse(route.params.status),
                useControl: route.params.useControl
            }
        )
        setLoaded(true)
    },[])

    function statusParser(statusCode: number) {
        if (statusCode == 0){
            return "Não Tomado"
        }
        if (statusCode == 1){
            return "Tomado"
        }
    }

    function handleStatusChange(){

        const lastUsedData = medicineData.useControl[medicineData.useControl.length - 1]
        const currentDate = new Date()

        if (medicineData.useControl.length == 1){
            const useControl:UseControlData = {
                dayOfWeek: currentDate.getDay(),
                date:      currentDate.toLocaleDateString(),
                useTime:   `${currentDate.getHours()}:${currentDate.getMinutes()}`,
                status:    1
            }

            const updatedMedicine:Medicine = {
                id: medicineData.id,        
                name: medicineData.name,
                usageDays: medicineData.usageDays + 1,
                currentDay: new Date().getDay(),
                status: 1,
                useControl: [useControl]
            }
    
            setMedicineData(updatedMedicine)
            database.updateMedicine(updatedMedicine)
        }
        else {
            const useControl:UseControlData = {
            dayOfWeek: lastUsedData.dayOfWeek,
            date: lastUsedData.date,
            useTime: lastUsedData.useTime,
            status: 1
            }


            const updatedMedicine:Medicine = {
                id: medicineData.id,        
                name: medicineData.name,
                usageDays: medicineData.usageDays + 1,
                currentDay: new Date().getDay(),
                status: 1,
                useControl: [...medicineData.useControl, useControl]
            }
            setMedicineData(updatedMedicine)
            database.updateMedicine(updatedMedicine)
        }
        startVisualInfoAnimation()
    }

    /* Visual transformation methods */

    function handleDeleteMedicine(id:string){
        database.deleteMedicine(id)
        setAnimationState(true)
    }

    function handleDeleteAnimationEnd(){
        setAnimationState(false)
        navigation.navigate("Main")
    }

    function startVisualInfoAnimation() {
        setAnimationRunning(true)
        Animated.timing(backgroundColor, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setAnimationRunning(false)
        });
    };

    const interpolatedColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['grey', 'green'],
    });

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <View style={styles.container}>
                <DeleteAnimation state={animationState} onAnimationFinish={handleDeleteAnimationEnd}/>
                <View style={[styles.medicineDetailContent, animationState == true ? {display: "none"}: {display: "flex"}]}>
                    <View style={styles.returnButtonContainer}>
                        <TouchableOpacity style={styles.returnButton} onPress={() => handleDeleteMedicine(medicineData.id)}>
                            <Image style={styles.returnButtonImage} source={Trash}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("Main")}>
                            <Image style={styles.returnButtonImage} source={RighArrow}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainInfoContainer}>
                        <View style={styles.mainInfoImageWrapper}>
                            <Image style={styles.mainInfoImage} source={Medicine}/>
                        </View>
                        <View style={styles.mainInfoTextWrapper}>
                            <Text style={styles.mainInfoText}>
                                {medicineData.name}
                            </Text>
                        </View>
                        <Animated.View 
                            style={[
                                styles.visualInfo,
                                { backgroundColor: interpolatedColor },
                                (medicineData.status == 0 && animationRunning == false) && {backgroundColor: "grey"},
                                (medicineData.status == 1 && animationRunning == false) && {backgroundColor: "green"},
                            ]}
                        />
                    </View>
                    <View style={styles.secondaryInfoContainer}>
                        <View style={[styles.usesCounter, {marginTop: "3%"}]}>
                            <InfoText 
                                title="Dias de uso" 
                                content={`${medicineData.usageDays}`}
                                aditional={ (medicineData.usageDays == 0 || medicineData.usageDays > 1)? "dias": "dia"}
                            />
                        </View>
                        <View style={styles.usesCounter}>
                            <InfoText 
                                title="Horario do proximo uso" 
                                content={`${medicineData.usageDays}`}
                                aditional={ (medicineData.usageDays == 0 || medicineData.usageDays > 1)? "dias": "dia"}
                            />
                        </View>
                        <View style={styles.usesCalendar}>
                            {loaded && <UseCalendar data={medicineData} navigation={navigation}/>}
                        </View>
                    </View>
                    <View style={styles.takenInformationContainer}>
                        <Text style={styles.takenInformationText}>
                            {statusParser(medicineData.status)}
                        </Text>
                    </View>
                    <View style={styles.confirmTakenButtonContainer}>
                        <TouchableOpacity 
                            style={[
                                styles.button, (medicineData.status == 1) && {display: "none"}
                            ]} 
                            activeOpacity={0.7} 
                            onPress={handleStatusChange}
                            disabled={
                                (medicineData.status == 1)
                            }
                        >
                            <Text style={styles.buttonText}>Tomei</Text>
                        </TouchableOpacity>  
                    </View>
                </View>
            </View>
        </>
    )
}

function InfoText(props: { title:string, content:string, aditional:string }) {
    return (
        <View style={infoTextStyle.textContainer}>
            <View style={infoTextStyle.textTitleContainer}>
                <Text style={infoTextStyle.textTitle}>
                    {props.title}
                </Text>
            </View>
            <View style={infoTextStyle.textContentContainer}>
                <Text style={infoTextStyle.textContentData}>
                    {props.content}
                </Text>
                <Text style={infoTextStyle.textContentAditional}>
                    {props.aditional}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    medicineDetailContent: {
        display: "flex", 
        flexDirection: "column",
        width: "94%",
        height: "100%",
        backgroundColor: "#F2F2F2"
    },
    returnButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "blue"
    },
    returnButton: {
        width: "15%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    returnButtonImage: {
        width: "55%",
        height: "100%",
        resizeMode: "contain",
    },
    mainInfoContainer: {
        display: "flex",
        flexDirection: "column",
        height: "22%",
        width: "100%",
        alignItems: "center",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // backgroundColor: "yellow"
    },
    visualInfo: {
        display: "flex",
        width: "100%",
        height: "5%",
        borderRadius: 5,
        backgroundColor: "yellow"
    },
    mainInfoImageWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "30%",
        height: "50%",
        // backgroundColor: "white"
    },
    mainInfoImage: {
        width: "90%",
        height: "90%",
        resizeMode: "contain",
    },
    mainInfoTextWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "45%",
        // backgroundColor: "pink"
    },
    mainInfoText: {
        fontSize: 40
    },
    secondaryInfoContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "42%",
        alignItems: "center",
        backgroundColor: "#F2F2F2"
        // backgroundColor: "red"
    },
    usesCounter: {
        display: "flex",
        width: "100%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
    },
    usesCalendar: {
        width: "100%",
        height: "35%",
        // backgroundColor: "yellow"
    },
    takenInformationContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "10%",
        // backgroundColor: "blue"
    },
    takenInformationText: {
        fontSize: 45,
        fontWeight: "bold",
    },
    confirmTakenButtonContainer: {
        width: "100%",
        height: "16%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
        backgroundColor: "#F2F2F2"
    },
    button: {
        width: "55%",
        height: "45%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#55a630",
        elevation: 3,
        marginBottom: "6%"
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 24
    }
}); 

const infoTextStyle = StyleSheet.create({
    textContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    textTitleContainer: {
        width: "100%",
        height: "55%",
        justifyContent: "center",
    },
    textTitle: {
        fontSize: 24,
        color: "#adb5bd",
        textAlign: "center"
    },
    textContentContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "45%",
        alignItems: "center",
        justifyContent: "center",
    },
    textContentData: {
        fontSize: 30,
        marginRight: "3%",
    },
    textContentAditional: {
        fontSize: 25,
        marginTop: "1%",
    }
});