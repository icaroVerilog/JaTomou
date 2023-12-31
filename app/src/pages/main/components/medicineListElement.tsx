import { StyleSheet, Text, View, Image, Alert, Pressable } from "react-native"
import medicine1 from "../../../../assets/icons/med6.png"


export default function MedicineListElement(props: {data:Medicine, navigation: any}) {

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

    return (
        <Pressable 
            style={styles.elementMain} 
            onPress={() => props.navigation.navigate("MedicineDetail", props.data)
        }>
            <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={medicine1}/>
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.medicineName}>
                    {props.data.name}
                </Text>
                <Text style={styles.medicineStatus}>
                    {statusParser(props.data.status)}
                </Text>
            </View>
            <View style={styles.timeStampWrapper}>
                <Text style={styles.timeStamp}>
                    {props.data.nextUsageCountdown}
                </Text>
            </View>
            <View style={[
                styles.visualInfo,
                (props.data.status == 0) && {backgroundColor: "grey"},
                (props.data.status == 1) && {backgroundColor: "green"},
                (props.data.status == 2) && {backgroundColor: "red"},
            ]}/>
        </Pressable>
    )
}

const elementBorderRadius = 5

const styles = StyleSheet.create({
    elementMain: {
        flex: 1,
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        width: "95%",
        height: 65,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: elementBorderRadius,
        elevation: 2,
        marginVertical: 5
    },
    imageContainer: {
        display: "flex",
        width: "17%",
        height: "100%",
        borderBottomLeftRadius: elementBorderRadius,
        borderTopLeftRadius: elementBorderRadius,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    imageWrapper: {
        display: "flex",
        width: "80%",
        height: "76%",
        // backgroundColor: "#AAFF22"
    },
    contentWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "60%",
        height: "100%",
        paddingLeft: "5%",
        justifyContent: "center",
        backgroundColor: "#e9ecef"
    },
    medicineName: {
        fontSize: 22
    },
    medicineStatus: {
        fontSize: 15
    },
    timeStampWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "19%",
        height: "100%",
        // backgroundColor: "#00ffff"
        backgroundColor: "#e9ecef"
    },
    timeStamp: {
        fontSize: 22
    },
    visualInfo: {
        display: "flex",
        width: "4%",
        height: "100%",
        borderTopRightRadius: elementBorderRadius,
        borderBottomRightRadius: elementBorderRadius,
        backgroundColor: "green"
        
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    }
}) 