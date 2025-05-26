import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {TestComponent} from "@/components/TestComponent";


export default function Test() {

    return(
        <SafeAreaView style={styles.monTexte}>
        <TestComponent/>
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    monTexte:{
        color: "salmon",
        backgroundColor: "salmon",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
})
