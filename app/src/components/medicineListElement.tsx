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

import medicine1 from "../../assets/icons/med6.png"

interface medicineData {
    name:                 String,
    status:               String,
    nextUse:              String
}

export default function MedicineListElement(props: medicineData) {
    return (
        <Pressable style={styles.elementMain} onPress={() => Alert.alert('Simple Button pressed')}>
            <View style={styles.imageContainer}>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={medicine1}/>
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.medicineName}>
                    {props.name}
                </Text>
                <Text style={styles.medicineStatus}>
                    {props.status}
                </Text>
            </View>
            <View style={styles.timeStampWrapper}>
                <Text style={styles.timeStamp}>
                    {props.nextUse}
                </Text>
            </View>
            <View style={styles.visualInfo}>

            </View>
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
        backgroundColor: "#31cb00"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    }
}); 