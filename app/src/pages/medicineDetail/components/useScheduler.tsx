import React          from "react"
import { useState }   from "react"
import { useEffect }  from "react"
import { StyleSheet } from "react-native"
import { View }       from "react-native"
import { Text }       from "react-native"
import { Pressable }  from "react-native"

type Data = {
    dayOfWeek: number,
    date: string,
    useTime: string,
    status: number,
    color: string
}

/* Refatorar para incluir o tipo certo certa */
export default function UseScheduler(props: { data: Medicine, navigation: any}){

    const [weekDaysData, setWeekDaysData] = useState<Data[]>([
        {
            dayOfWeek: 0,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        },
        {
            dayOfWeek: 1,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        },
        {
            dayOfWeek: 2,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        },
        {
            dayOfWeek: 3,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        },
        {
            dayOfWeek: 4,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        },
        {
            dayOfWeek: 5,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        },
        {
            dayOfWeek: 6,
            date: "00/00/0000",
            useTime: "00:00",
            status: 0,
            color: "#FFFFFF"
        }
    ])

    const [triggerRender, setTriggerRender] = useState<boolean>(false)

    useEffect(() =>{

        let weekDaysDataAux = weekDaysData
        const medicineUseData = props.data
        
        let i = medicineUseData.useControl.length - 1;
        while (i >= 0 && medicineUseData.useControl[i].dayOfWeek <= medicineUseData.useControl[medicineUseData.useControl.length - 1].dayOfWeek) {
            
            weekDaysDataAux[medicineUseData.useControl[i].dayOfWeek].date = medicineUseData.useControl[i].date
            weekDaysDataAux[medicineUseData.useControl[i].dayOfWeek].useTime = medicineUseData.useControl[i].useTime
            weekDaysDataAux[medicineUseData.useControl[i].dayOfWeek].status = medicineUseData.useControl[i].status

            if (medicineUseData.useControl[i].status == 1){
                weekDaysDataAux[medicineUseData.useControl[i].dayOfWeek].color = "green"
            }
            if (medicineUseData.useControl[i].status == 2){
                weekDaysDataAux[medicineUseData.useControl[i].dayOfWeek].color = "red"
            }
            i--;
        }


        setWeekDaysData(weekDaysDataAux)
        setTriggerRender(!triggerRender)
    },[props.data])

    return (
        <View style={calendar.container}>
            <View style={calendar.dataContainer}>
                <View style={calendar.titleContainer}>
                    <Text style={calendar.title}>Calendário</Text>
                </View>
                <View style={calendar.days}>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[0].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[0])}>
                        <Text>DOM</Text>
                    </Pressable>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[1].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[1])}>
                        <Text>SEG</Text>
                    </Pressable>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[2].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[2])}>
                        <Text>TER</Text>
                    </Pressable>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[3].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[3])}>
                        <Text>QUA</Text>
                    </Pressable>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[4].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[4])}>
                        <Text>QUI</Text>
                    </Pressable>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[5].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[5])}>
                        <Text>SEX</Text>
                    </Pressable>
                    <Pressable style={[weekDay.container, {backgroundColor: weekDaysData[6].color}]} onPress={() => props.navigation.navigate("UsageDayDetail", weekDaysData[6])}>
                        <Text>SAB</Text>
                    </Pressable>
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