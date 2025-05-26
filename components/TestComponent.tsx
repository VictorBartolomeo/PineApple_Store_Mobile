import {FlatList, GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import {ThemedText} from "@/components/ThemedText";
import {useEffect, useState} from "react";
import {User} from "@/models/User";
import {UserCard} from "@/components/UserCard";

export function TestComponent() {

    const [numberClick, setNumberClick] = useState(0)


    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(users => setUsers(users))
    }, []);

    return <>
        <Pressable onPress={() => {
            setNumberClick(numberClick + 1)
            console.log(numberClick)
        }}>
            <ThemedText style={styles.button}>Press me !</ThemedText>
        </Pressable>
        <ThemedText style={styles.number}>{numberClick}</ThemedText>
        <FlatList data={users}
                  renderItem={
                      ({item}) => (<UserCard user={item}></UserCard>)
        }/>
    </>
}

const styles = StyleSheet.create({
    button: {
        color: "white",
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        margin: 70,
        shadowColor: "white"
    },
    number: {
        fontSize: 20,
        color: "black",
    }
})
