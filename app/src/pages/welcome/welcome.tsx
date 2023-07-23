import { getStatusBarHeight } from 'react-native-status-bar-height'
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBarStyle,
    Image,
    Alert,
    Pressable,
    TouchableOpacity
} from 'react-native';

// import welcomeImg from "../../../assets/imgs/welcomeImg.png"

export default function Welcome() {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View style={styles.infoImageContainer}>
                    {/* <Image style={styles.infoimage} source={welcomeImg}/> */}
                </View>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>
                        Não perca mais os horários para tomar seus medicamentos
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => Alert.alert('Simple Button pressed')}>
                    <Text style={styles.buttonText}>Começar</Text>
                    {/* <ChevronRight></ChevronRight> */}
                </TouchableOpacity>  
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: '#fffaaa',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: getStatusBarHeight()
    },
    infoContainer: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffafff"
    },
    buttonContainer: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFaa"
    },
    infoImageContainer: {
        width: "100%",
        height: "70%",
        backgroundColor: "#FFAFFF",
        justifyContent: "center",
        alignContent: "center"
    },
    infoTextContainer: {
        width: "100%",
        height: "30%",
        backgroundColor: "#AFFFFF",
        justifyContent: "center",
        alignItems: "center"
    },
    infoText: {
        textAlign: "center",
        fontSize: 25
    },
    infoimage: {
        // flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    button: {
        width: "50%",
        height: "35%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: "4%",
        // backgroundColor: "#007f5f",
        backgroundColor: "#55a630",
        // backgroundColor: "#31cb00",
        elevation: 3,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 24
    }
  }); 