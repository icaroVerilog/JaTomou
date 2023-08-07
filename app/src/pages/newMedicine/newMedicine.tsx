import React                        from "react"
import { useEffect }                from "react"
import { useState }                 from "react"
import { Text }                     from "react-native"
import { View }                     from "react-native"
import { TextInput }                from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { Keyboard }                 from "react-native"
import { TouchableOpacity }         from "react-native"
import { Image }                    from "react-native"
import { StyleSheet }               from "react-native"
import { StatusBar }                from "react-native"

import SelectDropdown               from "react-native-select-dropdown"
import DatePicker                   from "./components/datepicker"

import Database                     from "../../database/database"
import leftArrow                    from "../../../assets/icons/general/back.png"
import OkAnimation                  from "../../components/okAnimation"



export default function NewMedicine({navigation}: any) {

    const database = new Database()

    const [focusedNameField, setFocusedNameField]                       = useState(false)
    const [filledNameField, setFilledNameField]                         = useState(false)
    const [animationState, setAnimationState] = useState<boolean>(false)

    const [medicine, setMedicine] = useState(
        {
            name: "",
            useIntervalType: 0,
            useInterval: 0,
            useTime: ""
        }
    )
    

    function handleMedicineNameChange(value: string){
        setMedicine((medicine) => ({...medicine, name: value}))
    }


    function handleCreateMedicine(){
        Keyboard.dismiss
        console.log("foi")
        database.persistMedicine(medicine)
        setAnimationState(true)
    }

    /* Visual control functions */

    function handleNameFieldFocus(){
        setFocusedNameField(true)
    }

    function handleNameFieldBlur(){
        setFocusedNameField(false)
        setFilledNameField(!!medicine.name)
    }

    function handleAnimationEnd(){
        setAnimationState(false)
        navigation.navigate("Main")
    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <OkAnimation state={animationState} onAnimationFinish={handleAnimationEnd}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.content, animationState == true ? {display: "none"}: {display: "flex"}]}>
                    <View style={styles.returnButtonContainer}>
                        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("Main")}>
                            <Image style={styles.returnButtonImage} source={leftArrow}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.instructionsText}>
                            Insira os dados do medicamento para que possamos te lembrar no horario correto
                        </Text>
                    </View>
                    <View style={styles.dataFields}>
                        <View style={styles.fieldWrapper}>
                            <TextInput 
                                style={[
                                    textfieldStyle.input,
                                    (focusedNameField || filledNameField) && {borderColor: "green"},
                                ]}
                                placeholder={"Digite o nome do medicamento"} 
                                onBlur={handleNameFieldBlur}
                                onFocus={handleNameFieldFocus}
                                onChangeText={handleMedicineNameChange}
                            />
                        </View>
                    </View>
                    <View style={styles.confirmButton}>
                        <TouchableOpacity style={confirmButtomStyle.button} activeOpacity={0.7} onPress={handleCreateMedicine}>
                            <Text style={confirmButtomStyle.text}>
                                Criar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: getStatusBarHeight(),
        backgroundColor: "#F2F2F2"
    },
    content: {
        display: "flex", 
        flexDirection: "column",
        height: "100%",
        width: "94%",
        backgroundColor: "#F2F2F2",
    },
    returnButtonContainer: {
        display: "flex",
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "flex-end",
        // backgroundColor: "grey"
    },
    returnButton: {
        width: "15%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    returnButtonImage: {
        width: "55%",
        height: "100%",
        resizeMode: "contain",
    },
    instructions: {
        display: "flex",
        width: "100%",
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "blue"
    },
    instructionsText: {
        fontSize: 22,
        textAlign: "center"
    },
    dataFields: {
        display: "flex",
        width: "100%",
        height: "55%",
        paddingTop: "10%",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "#FF00FF"
    },
    fieldWrapper: {
        width: "85%",
        height: "13%",
        marginBottom: "6%",
        // backgroundColor: "gray"
    },
    confirmButton: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow"
    }
})

const textfieldStyle = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: "gray",
        color: "#707070",
        width: "100%",
        height: "100%",
        fontSize: 19,
        padding: 0,
        textAlign: "center"
    }
})

const dropdownStyle = StyleSheet.create({
    button: {
        width: "100%",
        height: "100%",
        borderBottomWidth: 1,
        borderColor: "gray",
        backgroundColor: "transparent"
    },
    text: {
        color: "#707070",
        fontSize: 19,
    }
})

const confirmButtomStyle = StyleSheet.create({
    button: {
        width: "70%",
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
    text: {
        color: "#FFFFFF",
        fontSize: 24
    }
})