import React, {useState, useEffect} from "react"
import DateTimePicker from "@react-native-community/datetimepicker"
import { StyleSheet, Button, Platform, View, TouchableOpacity, Text} from "react-native"

export default function DatePicker(props: {getData: any, placeholder: string}){

    const [date, setDate]         = useState(new Date())
    const [textDate, setTextDate] = useState(props.placeholder)
    const [show, setShow]         = useState(false)


    // useEffect(() => {
    //     resetData()
    // },[props.resetData]);


    function handleDateChange(event: any, selectedDate: any){
        setShow(false)

        if (event.type == "set"){
            setDate(selectedDate)

            if (selectedDate.getHours() < 10 && selectedDate.getMinutes() < 10){
                setTextDate(`0${selectedDate.getHours()}:0${selectedDate.getMinutes()}`)
            }
            else if (selectedDate.getHours() < 10 && selectedDate.getMinutes() >= 10){
                setTextDate(`0${selectedDate.getHours()}:${selectedDate.getMinutes()}`)
            }
            else if (selectedDate.getHours() >= 10 && selectedDate.getMinutes() < 10){
                setTextDate(`${selectedDate.getHours()}:0${selectedDate.getMinutes()}`)
            }
            else {
                setTextDate(`${selectedDate.getHours()}:${selectedDate.getMinutes()}`)
            }
            console.log(selectedDate)
            props.getData(selectedDate)
        }
        if (event.type == "dismissed"){
            setDate(new Date())
            setTextDate(props.placeholder)
        }
    }

    function resetData(){
        setDate(new Date())
        setTextDate(props.placeholder)
    }

    function openPicker(){
        setShow(true)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openPicker} activeOpacity={0.9999}>
                <Text style={styles.buttonText}>
                    {textDate}
                </Text>
            </TouchableOpacity>
            {
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                        mode="time"
                
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "gray",
    },
    buttonText: {
        fontSize: 19,
        color: "#707070",
    }
})