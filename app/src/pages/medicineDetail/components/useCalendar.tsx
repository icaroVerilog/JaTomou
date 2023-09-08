import React          from "react"
import { useState }   from "react"
import { useEffect }  from "react"
import { StyleSheet } from "react-native"
import { View }       from "react-native"
import { Text }       from "react-native"

/* Refatorar para incluir o tipo certo certa */
export default function UseCalendar(props: { data: Medicine }){

    const [weekData, setWeekData] = useState<string[]>([
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF"
    ])
    
    useEffect(() =>{
        console.log(props.data)
        console.log("carregou calendario")
        const medicineUseData = props.data
        console.log(medicineUseData.useControl.length)
        for (let index = medicineUseData.useControl.length - 1; index >= 0; index--) {
            console.log(medicineUseData.useControl[index])
            
        }
        console.log("a")
        var updatedWeekData = weekData
                
        
        setWeekData(updatedWeekData)
    },[props.data])

    return (
        <View style={calendar.container}>
            <View style={calendar.dataContainer}>
                <View style={calendar.titleContainer}>
                    <Text style={calendar.title}>Calendário</Text>
                </View>
                <View style={calendar.days}>
                    <View style={[weekDay.container]}>
                        <Text>SEG</Text>
                    </View>
                    <View style={[weekDay.container]}>
                        <Text>TER</Text>
                    </View>
                    <View style={[weekDay.container]}>
                        <Text>QUA</Text>
                    </View>
                    <View style={[weekDay.container]}>
                        <Text>QUI</Text>
                    </View>
                    <View style={[weekDay.container]}>
                        <Text>SEX</Text>
                    </View>
                    <View style={[weekDay.container]}>
                        <Text>SAB</Text>
                    </View>
                    <View style={[weekDay.container]}>
                        <Text>DOM</Text>
                    </View>
                </View>
            </View>
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