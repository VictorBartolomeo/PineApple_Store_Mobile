
import {View} from 'react-native';
import {Button} from "tamagui";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {ThemedText} from "@/components/ThemedText";
import {NierStyles} from '@/constants/NierTheme';
import {
    GlobalStyles,
    TamaguiButtonPressStyle,
    TamaguiButtonStyles
} from '@/constants/GobalStyles'
import * as SecureStore from "expo-secure-store";
import {useRouter} from "expo-router";
import axios from "@/scripts/axiosConfig";
import {FormField} from "@/components/FormField";

type FormData = {
    email: string;
    password: string;
}

export default function ConnectionScreen() {
    const router = useRouter();

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            email: "coach@coach.com",
            password: "CaniC4mpus57*",
        },
    });

    const onValidForm = (data: FormData) => {
        axios.post('/login').then(response => {
            SecureStore.setItem("token", response.data)
            router.replace("/")
        })
    };

    return (
        <SafeAreaView style={[NierStyles.container, GlobalStyles.centeredContainer]}>
            <View style={GlobalStyles.formContainer}>
                <ThemedText type="title" style={GlobalStyles.pageTitle}>
                    AUTH_TERMINAL
                </ThemedText>

                <FormField
                    name="email"
                    label="EMAIL_ADDRESS:"
                    placeholder="[ENTER_EMAIL]"
                    control={control}
                    rules={{
                        required: "EMAIL_ADDRESS_REQUIRED",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "INVALID_EMAIL_FORMAT"
                        }
                    }}
                    error={errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <FormField
                    name="password"
                    label="ACCESS_KEY:"
                    placeholder="[ENTER_ACCESS_KEY]"
                    control={control}
                    rules={{required: "ACCESS_KEY_REQUIRED"}}
                    error={errors.password}
                    secureTextEntry={true}
                />

                <Button
                    {...TamaguiButtonStyles}
                    pressStyle={TamaguiButtonPressStyle}
                    onPress={handleSubmit(onValidForm)}
                    style={GlobalStyles.submitButton}
                >
                    <ThemedText style={NierStyles.buttonText}>
                        EXECUTE_AUTHENTICATION
                    </ThemedText>
                </Button>
            </View>
        </SafeAreaView>
    );
}