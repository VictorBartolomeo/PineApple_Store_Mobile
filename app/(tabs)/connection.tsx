import {StyleSheet} from 'react-native';
import {Button, Input} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";


export default function ConnectionScreen() {

    type FormData = {
        email: string;
        password: string;
    }

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onValidForm = (data) => {
        console.log(data)
    }

    return (
        <SafeAreaView>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input
                        size="$4"
                        borderWidth={2}
                        placeholder="Email"
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}/>
                )}
                name="email"
            />

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <Input size="$4"
                           borderWidth={2}
                           placeholder="Mot de passe"
                           secureTextEntry={true}
                           onChangeText={onChange}
                           value={value}
                           onBlur={onBlur}/>
                )}
                name="password"
            />

            <Button size="$3" themeInverse onPress={handleSubmit(onValidForm)}>
                Se connecter
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});