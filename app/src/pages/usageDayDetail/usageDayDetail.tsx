import React          from "react"
import { useState }   from "react"
import { useEffect }  from "react"
import { View }       from "react-native"
import { Text }       from "react-native"
import { StatusBar }  from "react-native"
import { StyleSheet } from "react-native"
import { Image } from "react-native"
import { TouchableOpacity } from "react-native"

import RighArrow from "../../../assets/icons/general/right-arrow.png"

type Data = {
    dayOfWeek: number,
    date: string,
    useTime: string,
    status: number,
    color: string
}

export default function UsageDayDetail({ route, navigation }: any) {

    const [dayData, setDayData] = useState<Data>(
        {
            dayOfWeek: 0,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        }
    )

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

    useEffect(() =>{
        console.log(route.params)
        setDayData(route.params)
    },[])

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <View style={styles.container}>
                {/* Local destinado a alguma animação que seja necessária */}
                <View style={styles.content}>
                    <View style={styles.returnButtonContainer}>
                        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("MedicineDetail")}>
                            <Image style={styles.returnButtonImage} source={RighArrow}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContainer}> 
                        <View style={styles.infoContent}>
                            <View style={styles.usageInformation}>
                                <View style={styles.infoTextContainer}>
                                    <InfoText 
                                        title="Data" 
                                        content={dayData.date}
                                    />
                                </View>
                                <View style={styles.infoTextContainer}>
                                    {<InfoText 
                                        title="Horário" 
                                        content={dayData.useTime}
                                    />}
                                </View>
                            </View>
                            <View style={styles.usageStatusContainer}>
                                <Text style={styles.usageStatus}>
                                    {statusParser(dayData.status)}
                                </Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </View>
        </>
    )
}

function InfoText(props: { title:string, content:string }) {
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
                {/* <Text style={infoTextStyle.textContentAditional}>
                    {props.aditional}
                </Text> */}
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
        // backgroundColor: "yellow"
    },
    content: {
        display: "flex", 
        flexDirection: "column",
        width: "94%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F2F2F2"
    },
    returnButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "10%",
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: "blue",
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
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "90%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    },
    infoContent: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        height: "40%",
        borderRadius: 25,
        elevation: 3,
        backgroundColor: "#FFFFFF"
    },



    usageInformation: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "70%",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "blue"
    },
    usageStatusContainer: {
        display: "flex",
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    infoTextContainer: {
        display: "flex",
        width: "90%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center"
    },
    usageStatus: {
        fontSize: 45,
        fontWeight: "bold",
    }
})

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