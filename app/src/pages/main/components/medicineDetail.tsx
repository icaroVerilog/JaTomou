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
} from 'react-native';

import med1 from "../../../../assets/icons/med6.png"

export default function MedicineDetail() {
    return (
        <View style={styles.medicineDetail}>
            <View style={styles.medicineDetailContent}>
                <View style={styles.mainInfo}>
                    <View style={styles.mainInfoImageWrapper}>
                        <Image style={styles.mainInfoImage} source={med1}/>
                    </View>
                    <View style={styles.mainInfoTextWrapper}>
                        <Text style={styles.mainInfoText}>
                            Dipirona
                        </Text>
                    </View>
                </View>
                <View style={styles.secondaryInfo}>
                    <View style={styles.secondaryInfoSub1}>
                        <InfoText 
                            title="Dias de uso" 
                            content="20"
                            aditional="dias"
                        />
                        <InfoText 
                            title="Dosagem" 
                            content="20"
                            aditional="mg"
                        />
                        <InfoText 
                            title="Horario uso anterior" 
                            content="15:58"
                            aditional=""
                        />
                    </View>
                    <View style={styles.secondaryInfoSub2}>
                        <InfoText 
                            title="Quantidade de uso" 
                            content="300"
                            aditional="vezes"
                        />
                        <InfoText 
                            title="Intervalo de uso" 
                            content="24"
                            aditional="horas"
                        />
                        <InfoText 
                            title="Horario próximo uso" 
                            content="15:58"
                            aditional=""
                        />
                    </View>
                    
                </View>
                <View style={styles.takenInformation}>
                    {/* <View style={styles.takenInformationInfo}>

                    </View> */}
                </View>
                <View style={styles.confirmTakenButton}>

                </View>
            </View>
        </View>
    )
}

type InfoTextProps = {
    title: string,
    content: string,
    aditional: string
}

function InfoText(props: InfoTextProps) {
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
        backgroundColor: "orange"
    },
    mainInfo: {
        display: "flex",
        flexDirection: "column",
        height: "26%",
        width: "100%",
        alignItems: "center",
        backgroundColor: "blue",
        elevation: 2
    },
    mainInfoImageWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "30%",
        height: "60%",
        backgroundColor: "green"
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
        backgroundColor: "grey"
    },
    mainInfoText: {
        fontSize: 28
    },
    secondaryInfo: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "40%",
        backgroundColor: "pink"
    },
    secondaryInfoSub1: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "red"
    },
    secondaryInfoSub2: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "brown"
    },
    takenInformation: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "20%",

        backgroundColor: "gray"
    },


    confirmTakenButton: {
        width: "100%",
        height: "14%",
        backgroundColor: "blue"
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
        marginTop: "4%",
        backgroundColor: "white",
    },
    textTitleContainer: {
        width: "100%",
        height: "40%",
        justifyContent: "flex-end",
        backgroundColor: "yellow"
    },
    textTitle: {
        fontSize: 15
    },
    textContentContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "60%",
        alignItems: "flex-end",
        backgroundColor: "green"
    },
    textContentData: {
        fontSize: 25,
        marginRight: "5%",
    },
    textContentAditional: {
        fontSize: 17,
    }
});