import { StatusBar    } from 'expo-status-bar';
import { ChevronRight } from 'react-native-feather';
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBarStyle,
    Image,
    Alert,
    Pressable,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';

import MedicineListElement from '../../components/medicineListElement'



const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58692a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58622a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58622a0f-3da1-471f-cd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '586220f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
  ];

export default function Main() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>

            </View>
            <View style={styles.newMedicine}>

            </View>
            <View style={styles.medicineList}>
                <FlatList
                    style={styles.medicineListScroll}
                    data={DATA}
                    renderItem={({item}) => <MedicineListElement name={item.title} status={"Nao Tomado"} nextUse={"00:00"}/>}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 35,
        backgroundColor: "#FFFFFF"
    },
    profile: {
        width: "100%",
        height: "20%",
        backgroundColor: "#77FFFF"
    },
    newMedicine: {
        width: "100%",
        height: "10%",
        backgroundColor: '#fffa00'
    },
    medicineList: {
        display: "flex",
        width: "100%",
        height: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFFFFF"
    },
    medicineListScroll: {
        width: "100%",
        height: "100%",
        
        backgroundColor: "#FAAFFF"
    }
  }); 