import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AppLoading     from "expo-app-loading"
import Welcome        from "./src/pages/welcome/welcome"
import Main           from "./src/pages/main/main"
import NewMedicine    from "./src/pages/newMedicine/newMedicine"
import MedicineDetail from "./src/pages/medicineDetail/medicineDetail"

import Database from "./src/database/database"


const Stack = createNativeStackNavigator()
const database = new Database()

export default function App() {

    const [updatedDataComplete, setUpdatedDataComplete] = useState<boolean>(false)
    const [alreadyUsed, setAlreadyUsed] = useState<boolean>(false)

    useEffect(() => {
        database.updateData()
        database.handleFirstUse().then((alreadyUsed) => {
            setAlreadyUsed(alreadyUsed)
            setTimeout(function(){
            }, 1000);
            setUpdatedDataComplete(true)
        })
    },[])

    if (updatedDataComplete == true){
        if (alreadyUsed == true){
            return (
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Main"}>
                        <Stack.Screen name="Main"           component={Main}    options={{animation:"slide_from_bottom"}}/>
                        <Stack.Screen name="NewMedicine"    component={NewMedicine} options={{animation:"slide_from_bottom"}}/>
                        <Stack.Screen name="MedicineDetail" component={MedicineDetail} options={{animation:"slide_from_bottom"}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }
        else {
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Welcome"}>
                    <Stack.Screen name="Welcome"        component={Welcome} options={{animation:"slide_from_left"}}/>
                    <Stack.Screen name="Main"           component={Main}    options={{animation:"slide_from_bottom"}}/>
                    <Stack.Screen name="NewMedicine"    component={NewMedicine} options={{animation:"slide_from_bottom"}}/>
                    <Stack.Screen name="MedicineDetail" component={MedicineDetail} options={{animation:"slide_from_bottom"}}/>
                </Stack.Navigator>
            </NavigationContainer>
        }
    }
    else {
        return (
            <AppLoading/>
        )
    }


    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
