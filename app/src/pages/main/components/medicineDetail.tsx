import React, {useState, useEffect} from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
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
    NativeModules
} from 'react-native'

import { Medicine } from '../../../types'
import med1 from "../../../../assets/icons/med6.png"

function status(statusCode: number) {
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

export default function MedicineDetail(props: { data:Medicine }) {

    // const [data, setData] = useState<Medicine>({
    //     id           : 0,
    //     name         : "medicine",
    //     usageDays    : 0,
    //     usageCount   : 0,
    //     dose         : 0,
    //     doseCategory : "N/A",
    //     useInterval  : 0,
    //     lastUsageTime: "N/A",
    //     nextUsageTime: "N/A",
    //     status       : 0
    // })

    return (
        <View style={styles.medicineDetail}>
            <View style={styles.medicineDetailContent}>
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoAdvert}/>
                    <View style={styles.mainInfoImageWrapper}>
                        <Image style={styles.mainInfoImage} source={med1}/>
                    </View>
                    <View style={styles.mainInfoTextWrapper}>
                        <Text style={styles.mainInfoText}>
                            {props.data.name}
                        </Text>
                    </View>
                </View>
                <View style={styles.secondaryInfo}>
                    <View style={styles.secondaryInfoSub1}>
                        <InfoText 
                            title="Dias de uso" 
                            content={`${props.data.usageDays}`}
                            aditional="dias"
                        />
                        <InfoText 
                            title="Dosagem" 
                            content={`${props.data.dose}`}
                            aditional={`${props.data.doseCategory}`}
                        />
                        <InfoText 
                            title="Horario uso anterior" 
                            content={`${props.data.lastUsageTime}`}
                            aditional=""
                        />
                    </View>
                    <View style={styles.secondaryInfoSub2}>
                        <InfoText 
                            title="Quantidade de uso" 
                            content={`${props.data.usageCount}`}
                            aditional="vezes"
                        />
                        <InfoText 
                            title="Intervalo de uso" 
                            content={`${props.data.useInterval}`}
                            aditional="horas"
                        />
                        <InfoText 
                            title="Horario próximo uso" 
                            content={`${props.data.nextUsageTime}`}
                            aditional=""
                        />
                    </View>
                    
                </View>
                <View style={styles.takenInformation}>
                    <Text style={styles.takenInformationText}>
                        {status(props.data.status)}
                    </Text>
                </View>
                <View style={styles.confirmTakenButton}>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => Alert.alert('Simple Button pressed')}>
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

        backgroundColor: '#fffa00'
    },
    medicineDetailContent: {
        display: "flex", 
        flexDirection: "column",
        height: "74%",
        width: "94%",
        marginTop: "4%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,

        backgroundColor: "orange"
    },
    mainInfo: {
        display: "flex",
        flexDirection: "column",
        height: "26%",
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
        backgroundColor: "green"
    },
    mainInfoImageWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "30%",
        height: "60%",

        // backgroundColor: "green"
    },
    mainInfoImage: {
        width: "80%",
        height: "80%",
        resizeMode: 'contain',
    },
    mainInfoTextWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40%",

        // backgroundColor: "grey"
    },
    mainInfoText: {
        fontSize: 35
    },
    secondaryInfo: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "40%",

        // backgroundColor: "pink"
    },
    secondaryInfoSub1: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",

        // backgroundColor: "red"
    },
    secondaryInfoSub2: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",

        // backgroundColor: "brown"
    },
    takenInformation: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "18%",

        // backgroundColor: "gray"
    },
    takenInformationText: {
        fontSize: 34,
        fontWeight: "bold"
    },
    confirmTakenButton: {
        width: "100%",
        height: "16%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "blue"
    },
    button: {
        width: "55%",
        height: "60%",
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
        marginTop: "7%",
        backgroundColor: "white",
    },
    textTitleContainer: {
        width: "100%",
        height: "40%",
        justifyContent: "flex-end",

        // backgroundColor: "yellow"
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