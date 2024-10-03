import React          from "react"
import { View }       from "react-native"
import { useState }   from "react"
import { useEffect }  from "react"
import { StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native"

import { StatusBar }  from "react-native"

export default function UsageCalendar({ route, navigation }:any) {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.returnButtonContainer}>
                        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("Main")}>
                            {/* <Image style={styles.returnButtonImage} source={RighArrow}/> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.calendaryContainer}>

                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    }, 
    content: {
        display: "flex", 
        flexDirection: "column",
        width: "94%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "#F2F2F2"
        backgroundColor: "green"
    },
    returnButtonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "10%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "blue"
    },
    returnButton: {
        width: "15%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow"
    },
    calendaryContainer: {
        display: "flex",
        flexDirection: "column",
        height: "90%",
        width: "100%",
        alignItems: "center",
        backgroundColor: "yellow"
    },
}); 