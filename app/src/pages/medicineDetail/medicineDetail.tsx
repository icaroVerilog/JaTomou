import React, {useState, useEffect} from "react"
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
    Platform,
    NativeModules,
    StatusBar
} from "react-native"

import Database from "../../database/database"


import leftArrow from "../../../assets/icons/general/back.png"
import trash     from "../../../assets/icons/general/trash2.png"
import med1      from "../../../assets/icons/med6.png"
import DeleteAnimation from "../../components/deleteAnimation"


import CalculateCountdown from "../../services/calculateCountdown"
import CalculateNextUseTime from "../../services/calculateNextUseTime"

const calculateUsageTime = new CalculateNextUseTime()
const calculateCountdown = new CalculateCountdown()
const database           = new Database()


export default function MedicineDetail({ route, navigation }:any) {

    const [useToday, setUseToday] = useState<boolean>(true)

    const [animationState, setAnimationState] = useState<boolean>(false)

    const [data, setData] = useState<Medicine>({
        id                : "",
        name              : "medicine",
        usageDays         : 0,
        usageCount        : 0,
        useInterval       : 0,
        lastUsageTime     : "N/A",
        nextUsageTime     : "N/A",
        nextUsageCountdown: "",
        status            : 0
    })

    useEffect(() => {
        setData({
            id: route.params.id,
            name: route.params.name,
            usageDays: JSON.parse(route.params.usageDays),
            usageCount: JSON.parse(route.params.usageCount),
            useInterval: JSON.parse(route.params.useInterval),
            lastUsageTime: route.params.lastUsageTime,
            nextUsageTime: route.params.nextUsageTime,
            nextUsageCountdown: route.params.nextUsageCountdown,
            status: JSON.parse(route.params.status)
        })
    
    
        const parsedNextUseDate = new Date(route.params.nextUsageTime).toLocaleString()
        const parsedPrevUseDate = new Date(route.params.lastUsageTime).toLocaleString()
    
        const [date, time] = parsedNextUseDate.split(" ")
        const [hours, minutes] = time.split(":")

        const actualDatetime = new Date()

        if (actualDatetime.toLocaleDateString() === date){
            if (actualDatetime.getHours() > Number(hours)){
                setUseToday(false)
            }
            else {
                setUseToday(true)
            }
        }
        else {
            setUseToday(false)
        }
    },[])

    function statusParser(statusCode: number) {
        if (statusCode == 0){
            return "Não Tomado"
        }
        if (statusCode == 1){
            return "Tomado"
        }
        if (statusCode == 2){
            return "Atrasado"
        }
    }

    function dateParser(rawDate: any){
        const parsedDate = new Date(rawDate).toLocaleString()

        const [date, time] = parsedDate.split(" ")
        const [hours, minutes] = time.split(":")
        const formatedTime = hours + ":" + minutes

        return formatedTime
    }

    function handleStatusChange(){
        
        var nextUsageTime

        if (new Date(data.lastUsageTime).toLocaleString() == new Date(0).toLocaleString()){
            nextUsageTime = calculateUsageTime.execute(new Date(), data.useInterval)
        }
        else {
            nextUsageTime = calculateUsageTime.execute(new Date(data.lastUsageTime), data.useInterval)
        }

        const updatedMedicine:Medicine = {
            id: data.id,        
            name: data.name,
            usageDays: 0,
            usageCount: data.usageCount + 1, 
            useInterval: data.useInterval,
            lastUsageTime: new Date(),
            nextUsageTime: nextUsageTime,
            nextUsageCountdown: calculateCountdown.execute(new Date(), nextUsageTime),
            status: 1
        }

        const nextUseDay = updatedMedicine.nextUsageTime.toLocaleString().split("/")
        const day        = updatedMedicine.nextUsageTime.toLocaleString().split("/")

        if (nextUseDay != day){
            setUseToday(false)
        }
        else {
            setUseToday(true)
        }
        setData(updatedMedicine)
        database.updateMedicine(updatedMedicine)
    }

    /* Visual control functions */

    function handleDeleteMedicine(id:string){
        database.deleteMedicine(id)
        setAnimationState(true)
    }

    function handleAnimationEnd(){
        setAnimationState(false)
        navigation.navigate("Main")
    }

    return (
        <View style={styles.medicineDetail}>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <DeleteAnimation state={animationState} onAnimationFinish={handleAnimationEnd}/>
            <View style={[styles.medicineDetailContent, animationState == true ? {display: "none"}: {display: "flex"}]}>
                <View style={styles.returnButtonContainer}>
                    <TouchableOpacity style={styles.returnButton} onPress={() => handleDeleteMedicine(data.id)}>
                        <Image style={styles.returnButtonImage} source={trash}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("Main")}>
                        <Image style={styles.returnButtonImage} source={leftArrow}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainInfoContainer}>
                    <View style={styles.mainInfoImageWrapper}>
                        <Image style={styles.mainInfoImage} source={med1}/>
                    </View>
                    <View style={styles.mainInfoTextWrapper}>
                        <Text style={styles.mainInfoText}>
                            {data.name}
                        </Text>
                    </View>
                    <View 
                        style={[
                            styles.mainInfoAdvert,
                            (data.status == 0) && {backgroundColor: "grey"},
                            (data.status == 1) && {backgroundColor: "green"},
                            (data.status == 2) && {backgroundColor: "red"},
                        ]}
                    />
                </View>
                <View style={styles.secondaryInfoContainer}>
                    <View style={styles.secondaryInfoSub1}>
                        <InfoText 
                            title="Dias de uso" 
                            content={`${data.usageDays}`}
                            aditional="dias"
                        />
                        <InfoText 
                            title="Dosagem" 
                            // content={`${props.data.dose}`}
                            // aditional={`${props.data.doseCategory}`}
                            content={"20"}
                            aditional={"mg"}
                        />
                        <InfoText 
                            title="Horario do uso anterior" 
                            content={
                                new Date(data.lastUsageTime).toLocaleString() == new Date(0).toLocaleString() ? "Não usado" : `${dateParser(data.lastUsageTime)}` 
                            }
                            aditional=""
                        />
                    </View>
                    <View style={styles.secondaryInfoSub2}>
                        <InfoText 
                            title="Quantidade de uso" 
                            content={`${data.usageCount}`}
                            aditional="vezes"
                        />
                        <InfoText 
                            title="Intervalo de uso" 
                            content={`${data.useInterval}`}
                            aditional="horas"

                        />
                        <InfoText 
                            title="Horario do próximo uso" 
                            content={`${dateParser(data.nextUsageTime)}`}
                            aditional={useToday? "hoje" : "amanha"}
                        />
                    </View>
                </View>
                <View style={styles.takenInformationContainer}>
                    <Text style={styles.takenInformationText}>
                        {statusParser(data.status)}
                    </Text>
                </View>
                <View style={styles.confirmTakenButtonContainer}>
                    <TouchableOpacity 
                        style={[
                            styles.button, (data.status == 1) && {display: "none"}
                        ]} 
                        activeOpacity={0.7} 
                        onPress={handleStatusChange}
                        disabled={
                            (data.status == 1)
                        }
                    >
                        <Text style={styles.buttonText}>
                            Tomei
                        </Text>
                    </TouchableOpacity>  
                </View>
            </View>
        </View>
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
    medicineDetail: {
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
        height: "25%",
        width: "100%",
        alignItems: "center",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    mainInfoAdvert: {
        display: "flex",
        width: "100%",
        height: "5%",
        borderRadius: 5,
    },
    mainInfoImageWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "30%",
        height: "50%",
    },
    mainInfoImage: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",
    },
    mainInfoTextWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
    },
    mainInfoText: {
        fontSize: 35
    },
    secondaryInfoContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "31%",
    },
    secondaryInfoSub1: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    secondaryInfoSub2: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    takenInformationContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "18%",
    },
    takenInformationText: {
        fontSize: 34,
        fontWeight: "bold"
    },
    confirmTakenButtonContainer: {
        width: "100%",
        height: "16%",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "55%",
        height: "45%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#55a630",
        elevation: 3,
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
        width: "90%",
        height: "25%",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "2%",
    },
    textTitleContainer: {
        width: "100%",
        height: "40%",
        justifyContent: "flex-end",
    },
    textTitle: {
        fontSize: 15,
        color: "#adb5bd"
    },
    textContentContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "60%",
        alignItems: "center",
    },
    textContentData: {
        fontSize: 25,
        marginRight: "5%",
    },
    textContentAditional: {
        marginTop: 8,
        fontSize: 17,
    }
});