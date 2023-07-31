import { getStatusBarHeight } from 'react-native-status-bar-height'
import { StyleSheet, Text, View, Image, Alert, Pressable, TouchableOpacity, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import welcomeImg from "../../../assets/imgs/welcomeImg.png"

export default function Welcome({navigation}: any) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />
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
                <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => navigation.navigate('Main')}>
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