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

export default function MedicineDetail({ route, navigation }:any) {

    const database = new Database()

    const [animationState, setAnimationState] = useState<boolean>(false)


    const [data, setData] = useState<Medicine>({
        id           : "",
        name         : "medicine",
        usageDays    : 0,
        currentDay   : 0,
        status       : 0
    })

    useEffect(() =>{
        setData(
            {
                id: route.params.id,
                name: route.params.name,
                usageDays: JSON.parse(route.params.usageDays),
                currentDay: JSON.parse(route.params.currentDay),
                status: JSON.parse(route.params.status)
            }
        )

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

    function handleStatusChange(){
        const updatedMedicine:Medicine = {
            id: data.id,        
            name: data.name,
            usageDays: data.usageDays + 1,
            currentDay: new Date().getDay(),
            status: 1
        }
        setData(updatedMedicine)
        database.updateMedicine(updatedMedicine)
    }


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
                    <View style={styles.usesCounter}>
                        <InfoText 
                            title="Dias de uso" 
                            content={`${data.usageDays}`}
                            aditional="dias"
                        />
                    </View>
                    <View style={styles.usesCalendar}>

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
                        <Text style={styles.buttonText}>Tomei</Text>
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

        // backgroundColor: "#fffa00"
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
        // backgroundColor: "grey"
    },
    returnButton: {
        width: "15%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
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
        
        // backgroundColor: "blue",
    },
    mainInfoAdvert: {
        display: "flex",
        width: "100%",
        height: "5%",
        borderRadius: 5,
        // backgroundColor: "green"
    },
    mainInfoImageWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "30%",
        height: "50%",

        // backgroundColor: "green"
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

        // backgroundColor: "grey"
    },
    mainInfoText: {
        fontSize: 35
    },
    secondaryInfoContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "34%",

        // backgroundColor: "pink"
    },
    usesCounter: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    usesCalendar: {
        width: "100%",
        height: "60%",
        // backgroundColor: "white"
    },
    takenInformationContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "15%",

        // backgroundColor: "gray"
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
        // backgroundColor: "blue"
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
        width: "40%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        // backgroundColor: "white",
    },
    textTitleContainer: {
        width: "100%",
        height: "60%",
        justifyContent: "flex-end",

        // backgroundColor: "blue"
    },
    textTitle: {
        fontSize: 25,
        color: "#adb5bd",
        textAlign: "center"
    },
    textContentContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "40%",
        alignItems: "center",
        justifyContent: "center",

        // backgroundColor: "green"
    },
    textContentData: {
        fontSize: 25,
        marginRight: "5%",

    },
    textContentAditional: {
        fontSize: 17,
    }
});