import { getStatusBarHeight } from 'react-native-status-bar-height'
import { StyleSheet, Text, View, Image, Alert, Pressable, TouchableOpacity, StatusBar } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import welcomeImg from "../../../assets/imgs/welcomeImg.png"

export default function Welcome({navigation}: any) {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoImageContainer}>
                        <Image style={styles.infoimage} source={welcomeImg}/>
                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoText}>
                            Não se esqueça mais de tomar seus medicamentos diários
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
        </>
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
        height: "75%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffafff"
    },
    buttonContainer: {
        width: "100%",
        height: "25%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F2"
    },
    infoImageContainer: {
        width: "100%",
        height: "75%",
        backgroundColor: "#F2F2F2",
        justifyContent: "center",
        alignContent: "center"
    },
    infoTextContainer: {
        width: "100%",
        height: "25%",
        backgroundColor: "#F2F2F2",
        justifyContent: "center",
        alignItems: "center"
    },
    infoText: {
        textAlign: "center",
        fontSize: 25
    },
    infoimage: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    button: {
        width: "60%",
        height: "33%",
        borderRadius: 100,
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