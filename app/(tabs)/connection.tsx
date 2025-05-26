import {StyleSheet} from 'react-native';
import {Button, Input} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
import {ThemedText} from "@/components/ThemedText";


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

    const onValidForm = (data: any) => {
        console.log(data)
    }

    return (
        <SafeAreaView>
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
            {errors.email?.type === "required" && <ThemedText>L&#39;email est requis mon gaté</ThemedText>}
            {errors.email?.type === "pattern" && <ThemedText>L&#39;email est mal formé</ThemedText>}

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
            {errors.password && <ThemedText>Le mot de passe est requis mon gaté</ThemedText>}

            <Button size="$3" themeInverse onPress={handleSubmit(onValidForm)}>
                Se connecter
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});