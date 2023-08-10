import React                        from "react"
import { useEffect }                from "react"
import { useState }                 from "react"
import { Text }                     from "react-native"
import { useWindowDimensions }      from "react-native"
import { View }                     from "react-native"
import { TextInput }                from "react-native"
import { TouchableWithoutFeedback } from "react-native"
import { Keyboard }                 from "react-native"
import { TouchableOpacity }         from "react-native"
import { Image }                    from "react-native"
import { StyleSheet }               from "react-native"
import { StatusBar }                from "react-native"

import Database                     from "../../database/database"
import RightArrow                   from "../../../assets/icons/general/right-arrow.png"
import OkAnimation                  from "../../components/okAnimation"


export default function NewMedicine({navigation}: any) {

    const database = new Database()

    const windowHeight = useWindowDimensions().height;
    
    const [focusedNameField, setFocusedNameField] = useState<boolean>(false)
    const [filledNameField, setFilledNameField]   = useState<boolean>(false)
    const [errorNameField, setErrorNameField]     = useState<boolean>(false)
    const [animationState, setAnimationState]     = useState<boolean>(false)

    const [medicineNamePlaceholder, setMedicineNamePlaceholder] = useState<string>("Digite o nome do medicamento")

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
        Keyboard.dismiss()

        if (filledNameField == false){
            setErrorNameField(true)
            setMedicineNamePlaceholder("É obrigatório inserir um nome")
        }
        else {
            database.persistMedicine(medicine)
            setAnimationState(true)
        }
    }

    /* Visual control functions */

    function handleNameFieldFocus(){
        setFocusedNameField(true)
        setErrorNameField(false)
        setMedicineNamePlaceholder("")
    }

    function handleNameFieldBlur(){
        setFocusedNameField(false)
        if (medicine.name == ""){
            setMedicineNamePlaceholder("Digite o nome do medicamento")
        }
        setFilledNameField(!!medicine.name)
    }

    function handleAnimationEnd(){
        setAnimationState(false)
        navigation.navigate("Main")
    }


    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />
            <View style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
                <OkAnimation state={animationState} onAnimationFinish={handleAnimationEnd}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.content, animationState == true ? {display: "none"}: {display: "flex"}]}>
                        <View style={styles.returnButtonContainer}>
                            <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("Main")}>
                                <Image style={styles.returnButtonImage} source={RightArrow}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.instructions}>
                            <Text style={styles.instructionsText}>
                                Digite o nome do medicamento parque criar um lembrete
                            </Text>
                        </View>
                        <View style={styles.dataFields}>
                            <View style={styles.fieldWrapper}>
                                <TextInput 
                                    maxLength={18}
                                    selectionColor={"grey"}
                                    style={[
                                        textfieldStyle.input,
                                        (focusedNameField || filledNameField) && {borderColor: "green"},
                                        (errorNameField) && {borderColor: "red"}
                                    ]}
                                    placeholder={medicineNamePlaceholder} 
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
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
    },
    returnButton: {
        width: "15%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
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
    },
    instructionsText: {
        fontSize: 22,
        textAlign: "center"
    },
    dataFields: {
        display: "flex",
        width: "100%",
        height: "55%",
        paddingTop: "30%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    fieldWrapper: {
        width: "85%",
        height: "13%",
        marginBottom: "6%",
    },
    confirmButton: {
        width: "100%",
        height: "20%",
        justifyContent: "flex-start",
        alignItems: "center",
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


const confirmButtomStyle = StyleSheet.create({
    button: {
        width: "70%",
        height: "35%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#55a630",
        elevation: 3,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 24
    }
})