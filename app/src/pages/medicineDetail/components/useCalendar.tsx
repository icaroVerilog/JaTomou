import React          from "react"
import { StyleSheet } from "react-native"
import { View }       from "react-native"
import { Text }       from "react-native"

export default function UseCalendar(){

    return (
        <View style={calendar.container}>
            <View style={calendar.dataContainer}>
                <View style={calendar.titleContainer}>
                    <Text style={calendar.title}>Calendário</Text>
                </View>
                <View style={calendar.days}>
                    <WeekDay day="DOM"/>
                    <WeekDay day="SEG"/>
                    <WeekDay day="TER"/>
                    <WeekDay day="QUA"/>
                    <WeekDay day="QUI"/>
                    <WeekDay day="SEX"/>
                    <WeekDay day="SAB"/>
                </View>
            </View>
        </View>   
    )
}

function WeekDay(props: { day:string }){
    return (
        <View style={weekDay.container}>
            <Text>{props.day}</Text>
        </View>
    )
}

const weekDay = StyleSheet.create({
    container: {
        display: "flex",
        height: "55%",
        width: "12%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
        elevation: 2,
        backgroundColor: "#FFFFFF",
    }
});
  


const calendar = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "pink"
    },
    dataContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // backgroundColor: "red"
    },
    titleContainer: {
        display: "flex",
        width: "100%",
        height: "38%",
        justifyContent: "flex-end",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    title: {
        fontSize: 24,
        color: "#adb5bd",
        textAlign: "center"
    },
    days: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "62%",
        width: "100%",
        // backgroundColor: "blue"
    },
    actionButton: {
        display: "flex",
        width: "12.5%",
        height: "100%",
    }
});