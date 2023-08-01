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

    const [animationState, setAnimationState] = useState<boolean>(false)

    const [medicine, setMedicine] = useState(
        {
            name: "",
            useIntervalType: 0,
            useInterval: 0,
            doseTime: ""
        }
    )
    

    function handleMedicineNameChange(value: string){
        setMedicine((medicine) => ({...medicine, name: value}))
    }

    function handleUseIntervalTypeChange(value: string){
        if (value === "Diário") {
            setMedicine((medicine) => ({...medicine, useIntervalType: 1, useInterval: 24}))
        }
        if (value === "Temporário") {
            setMedicine((medicine) => ({...medicine, useIntervalType: 2}))  
        }
    }

    function handleUseIntervalChange(value: number){
        setMedicine((medicine) => ({...medicine, useInterval: value}))   
    }

    function handleDoseTimeChange(value: string){
        setMedicine((medicine) => ({...medicine, doseTime: value}))   
    }

    function handleCreateMedicine(){
        Keyboard.dismiss
        if (medicine.name == ""){
            console.log("a")
        }
        if (medicine.doseTime == ""){
            console.log("va")
        }
        database.persistMedicine(medicine)
        setAnimationState(true)
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
                                    textfieldStyle.input, // Se estiver focado, a borda fica verde
                                    // (isFocused || isFilled) && {borderColor: "green"},
                                ]}
                                placeholder={"Digite o nome do medicamento"} 
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleMedicineNameChange}
                            />
                        </View>
                        <View style={styles.fieldWrapper}>
                            <SelectDropdown
                                buttonStyle={dropdownStyle.button}
                                buttonTextStyle={dropdownStyle.text}
                                defaultButtonText="Selecione o tipo de uso"
                                data={["Diário", "Temporário"]}
                                onSelect={(selectedItem) => {handleUseIntervalTypeChange(selectedItem)}}
                                buttonTextAfterSelection={(selectedItem) => {return selectedItem}}
                                rowTextForSelection={(item, index) => {return item}}
                            />
                        </View>
                        <View style={[styles.fieldWrapper, medicine.useIntervalType == 1 ? {display: "flex"}: {display: "none"}]}>
                            <DatePicker getData={handleDoseTimeChange} placeholder="Selecione o horário de uso"/>
                        </View>
                        <View style={[styles.fieldWrapper, medicine.useIntervalType == 2 ? {display: "flex"}: {display: "none"}]}>
                            <DatePicker getData={handleDoseTimeChange} placeholder="Selecione o horário do primeiro uso"/>
                        </View>
                        <View style={[styles.fieldWrapper, medicine.useIntervalType == 2 ? {display: "flex"}: {display: "none"}]}>
                        <SelectDropdown
                                buttonStyle={dropdownStyle.button}
                                buttonTextStyle={dropdownStyle.text}
                                defaultButtonText="Selecione o intervalo de uso"
                                data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]}
                                onSelect={(selectedItem) => {handleUseIntervalChange(selectedItem)}}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem == 1 ? `${selectedItem} hora`: `${selectedItem} horas`
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item == 1 ? `${item} hora`: `${item} horas`
                                }}
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
        color: "#000000",
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