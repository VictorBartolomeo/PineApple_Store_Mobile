import {GestureResponderEvent, Pressable} from 'react-native';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";

type TestComponentProps= {value:string, callback : (event:GestureResponderEvent) =>void }

export function TestComponent({value, callback}: TestComponentProps){

  return(
      <Pressable onPress={callback}>
        <ThemedView>
          <ThemedText>MON TEST : {value}</ThemedText>
        </ThemedView>;
      </Pressable>
    )
}
