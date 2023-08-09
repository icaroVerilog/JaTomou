import React, {useState, useEffect} from "react"
import { StyleSheet }       from "react-native"
import { Text }             from "react-native"
import { View }             from "react-native"
import { Image }            from "react-native"
import { TouchableOpacity } from "react-native"
import { StatusBar }        from "react-native"
import { Animated }         from "react-native"
import { useAnimatedValue } from "react-native"

import Database             from "../../database/database"

import leftArrow            from "../../../assets/icons/general/back.png"
import trash                from "../../../assets/icons/general/trash.png"
import medicine             from "../../../assets/icons/medicine/med3.png"
import DeleteAnimation      from "../../components/deleteAnimation"

export default function MedicineDetail({ route, navigation }:any) {

    const database = new Database()

    const [animationState, setAnimationState] = useState<boolean>(false)
    const [backgroundColor] = useState(new Animated.Value(0))
    const [animationRunning, setAnimationRunning] = useState<boolean>(false)

    const [data, setData] = useState<Medicine>({
        id           : "",
        name         : "medicine",
        usageDays    : 0,
        currentDay   : 0,
        usedDays     : [],
        status       : 0
    })

    useEffect(() =>{
        setData(
            {
                id: route.params.id,
                name: route.params.name,
                usageDays: JSON.parse(route.params.usageDays),
                currentDay: JSON.parse(route.params.currentDay),
                usedDays: route.params.usedDays,
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
            status: 1,
            usedDays: [...data.usedDays, new Date().toLocaleDateString()]
        }
        startVisualInfoAnimation()
        setData(updatedMedicine)
        database.updateMedicine(updatedMedicine)
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
            <View style={styles.medicineDetail}>
                <DeleteAnimation state={animationState} onAnimationFinish={handleDeleteAnimationEnd}/>
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
                            <Image style={styles.mainInfoImage} source={medicine}/>
                        </View>
                        <View style={styles.mainInfoTextWrapper}>
                            <Text style={styles.mainInfoText}>
                                {data.name}
                            </Text>
                        </View>
                        <Animated.View 
                            style={[
                                styles.visualInfo,
                                { backgroundColor: interpolatedColor },
                                (data.status == 0 && animationRunning == false) && {backgroundColor: "grey"},
                                (data.status == 1 && animationRunning == false) && {backgroundColor: "green"},
                            ]}
                        />
                    </View>
                    <View style={styles.secondaryInfoContainer}>
                        <View style={styles.usesCounter}>
                            <InfoText 
                                title="Dias de uso" 
                                content={`${data.usageDays}`}
                                aditional={ (data.usageDays == 0 || data.usageDays > 1)? "dias": "dia"}
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
        flexDirection: "column",
        width: "100%",
        height: "34%",
    },
    usesCounter: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    usesCalendar: {
        width: "100%",
        height: "60%",
    },
    takenInformationContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "15%",
    },
    takenInformationText: {
        fontSize: 45,
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
        width: "40%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    textTitleContainer: {
        width: "100%",
        height: "60%",
        justifyContent: "flex-end",
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
    },
    textContentData: {
        fontSize: 30,
        marginRight: "5%",
    },
    textContentAditional: {
        fontSize: 20,
        marginTop: "5%",
    }
});