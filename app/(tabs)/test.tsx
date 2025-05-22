import {StyleSheet,View, Text} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";


export default function Test() {

    const insets=useSafeAreaInsets();
    console.log(insets)
    return(
        <ThemedView style={{marginTop:insets.top, marginBottom:insets.bottom, marginLeft:insets.left, marginRight:insets.right}}>
            <ThemedText style={styles.monTexte}>MAIS TON GROS WIFI DE GOLMON</ThemedText>
        </ThemedView>
    );
}

const styles=StyleSheet.create({

    monTexte:{
        color: "salmon"
    }

})
