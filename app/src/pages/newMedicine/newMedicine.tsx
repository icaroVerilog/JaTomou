import React, {useState, useEffect} from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native'

import { Medicine } from "../../types"

export default function NewMedicine() {

    const [medicine, setMedicine] = useState(
        {
            name: "",
            useIntervalType: 0,
            useInterval: "",
            // doseType: "",
            // dose: "",
            doseTime: ""
        }
    )
    
    const useType = ["Diário", "Temporário"]


    
    function handleMedicineNameChange(value: string){
        console.log(value)
        setMedicine((medicine) => ({...medicine, name: value}))
    }

    function handleUseIntervalTypeChange(value: string){
        console.log(value)

        if (value === "Diário") {
            setMedicine((medicine) => ({...medicine, useIntervalType: 1, useInterval: "24:00"}))
        }
        if (value === "Temporário") {
            setMedicine((medicine) => ({...medicine, useIntervalType: 2}))  
        }
    }

    function handleUseIntervalChange(value: string){
        setMedicine((medicine) => ({...medicine, useInterval: value}))   
    }

    // function handleDoseTypeChange(value: string){
    //     setMedicine((medicine) => ({...medicine, doseType: value}))   
    // }

    // function handleDoseChange(value: string){
    //     setMedicine((medicine) => ({...medicine, dose: value}))   
    // }

    function handleDoseTimeChange(value: string){
        setMedicine((medicine) => ({...medicine, doseTime: value}))   
    }


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.returnButton}>

                    </View>
                    <View style={styles.instructions}>
                        <Text style={styles.instructionsText}>
                            Insira os dados do medicamento para que possamos te lembrar no horario correto
                        </Text>
                    </View>
                    <View style={styles.fields}>
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
                                defaultButtonText='Selecione o tipo de uso'
                                data={useType}
                                onSelect={(selectedItem) => {
                                    handleUseIntervalTypeChange(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            />
                        </View>
                        <View style={[styles.fieldWrapper, medicine.useIntervalType == 1 ? {display: "flex"}: {display: "none"}]}>
                            <TextInput 
                                style={[
                                    textfieldStyle.input, // Se estiver focado, a borda fica verde
                                    // (isFocused || isFilled) && {borderColor: "green"},
                                ]}
                                placeholder={"Digite o horário de uso"} 
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleMedicineNameChange}
                            />
                        </View>
                        <View style={[styles.fieldWrapper, medicine.useIntervalType == 2 ? {display: "flex"}: {display: "none"}]}>
                            <TextInput 
                                style={[
                                    textfieldStyle.input, // Se estiver focado, a borda fica verde
                                    // (isFocused || isFilled) && {borderColor: "green"},
                                ]}
                                placeholder={"Insira o intervalo entre os usos"} 
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleUseIntervalChange}
                            />
                        </View>
                        <View style={[styles.fieldWrapper, medicine.useIntervalType == 2 ? {display: "flex"}: {display: "none"}]}>
                            <TextInput 
                                style={[
                                    textfieldStyle.input, // Se estiver focado, a borda fica verde
                                    // (isFocused || isFilled) && {borderColor: "green"},
                                ]}
                                placeholder={"Insira o horario do primeiro uso"} 
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleUseIntervalChange}
                            />
                        </View>
                    </View>
                    <View style={styles.confirmButton}>
                        <TouchableOpacity style={confirmButtomStyle.button}>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: getStatusBarHeight(),
        backgroundColor: "red"
    },
    content: {
        display: "flex", 
        flexDirection: "column",
        height: "100%",
        width: "94%",
        backgroundColor: "white",
    },
    returnButton: {
        display: "flex",
        width: "100%",
        height: "10%",
        backgroundColor: "gray"
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
    fields: {
        display: "flex",
        width: "100%",
        height: "55%",
        paddingTop: "10%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    fieldWrapper: {
        width: "85%",
        height: "12%",
        marginBottom: "6%",
        // backgroundColor: "gray"
    },
    confirmButton: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow"
    }
})

const textfieldStyle = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: "gray",
        color: "#000000",
        width: "100%",
        height: "100%",
        fontSize: 18,
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
        fontSize: 18,
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