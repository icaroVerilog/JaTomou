import React, { useEffect } from "react"
import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"


import Welcome from "./src/pages/welcome/welcome"
import Main     from "./src/pages/main/main"
import NewMedicine from "./src/pages/newMedicine/newMedicine"
import MedicineDetail from "./src/pages/medicineDetail/medicineDetail"

import Database from "./src/database/database"


const Stack = createNativeStackNavigator()
const database = new Database()

export default function App() {

    useEffect(() => {
        database.updateData()
    },[])


    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
                <Stack.Screen name="Welcome"        component={Welcome} options={{animation:"fade_from_bottom"}}/>
                <Stack.Screen name="Main"           component={Main}    options={{animation:"fade_from_bottom"}}/>
                <Stack.Screen name="NewMedicine"    component={NewMedicine} options={{animation:"slide_from_left"}}/>
                <Stack.Screen name="MedicineDetail" component={MedicineDetail} options={{animation:"slide_from_right"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
