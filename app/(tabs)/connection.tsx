import { StyleSheet, View } from 'react-native';
import { Button, Input } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { NierTheme, NierStyles } from '@/constants/NierTheme';
import * as SecureStore from "expo-secure-store";
import {useRouter} from "expo-router";

export default function ConnectionScreen() {
    const router=useRouter()

    type FormData = {
        email: string;
        password: string;
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: "coach@coach.com",
            password: "CaniC4mpus57*",
        },
    })


    const onValidForm = (data: FormData) => {

        const options : RequestInit ={
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify(data)
        }
        fetch( process.env.EXPO_PUBLIC_API_URL+"/login", options)
            .then(response => response.text())
            .then(jwt => {
                console.log(jwt)
                SecureStore.setItem("token", jwt)
                console.log(SecureStore.getItem("token"))
                router.replace("/")
            })
    }

    return (
        <SafeAreaView style={[NierStyles.container, styles.safeAreaContainer]}>
            <View style={styles.formContainer}>
                <ThemedText type="title" style={styles.pageTitle}>
                    AUTH_TERMINAL
                </ThemedText>

                <View style={styles.inputGroup}>
                    <ThemedText type="muted" style={styles.label}>EMAIL_ADDRESS:</ThemedText>
                    <Controller
                        control={control}
                        rules={{
                            required: "EMAIL_ADDRESS_REQUIRED",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "INVALID_EMAIL_FORMAT"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                backgroundColor={NierTheme.colors.surface}
                                borderColor={errors.email ? NierTheme.colors.error : NierTheme.colors.border}
                                borderWidth={2}
                                focusStyle={{
                                    borderColor: NierTheme.colors.accent,
                                }}
                                color={NierTheme.colors.text}
                                fontFamily={NierTheme.typography.fontFamily}
                                fontSize={NierTheme.typography.sizes.md}
                                paddingHorizontal={NierTheme.spacing.md}
                                paddingVertical={NierTheme.spacing.sm}
                                // Fin des props Tamagui pour style Nier
                                size="$4" // Taille du composant Input Tamagui
                                placeholder="[ENTER_EMAIL]"
                                placeholderTextColor={NierTheme.colors.textMuted}
                                onChangeText={onChange}
                                value={value}
                                onBlur={onBlur}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        )}
                        name="email"
                    />
                    {errors.email && (
                        <ThemedText style={styles.errorMessage}>
                            {errors.email.message === "EMAIL_ADDRESS_REQUIRED" ? "[ERROR] EMAIL_ADDRESS_REQUIRED" : "[ERROR] INVALID_EMAIL_FORMAT"}
                        </ThemedText>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <ThemedText type="muted" style={styles.label}>ACCESS_KEY:</ThemedText>
                    <Controller
                        control={control}
                        rules={{
                            required: "ACCESS_KEY_REQUIRED",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                backgroundColor={NierTheme.colors.surface}
                                borderColor={errors.password ? NierTheme.colors.error : NierTheme.colors.border}
                                borderWidth={2}
                                focusStyle={{
                                    borderColor: NierTheme.colors.accent,
                                }}
                                color={NierTheme.colors.text}
                                fontFamily={NierTheme.typography.fontFamily}
                                fontSize={NierTheme.typography.sizes.md}
                                paddingHorizontal={NierTheme.spacing.md}
                                paddingVertical={NierTheme.spacing.sm}
                                size="$4"
                                placeholder="[ENTER_ACCESS_KEY]"
                                placeholderTextColor={NierTheme.colors.textMuted}
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                                onBlur={onBlur}
                            />
                        )}
                        name="password"
                    />
                    {errors.password && (
                        <ThemedText style={styles.errorMessage}>
                            [ERROR] {errors.password.message}
                        </ThemedText>
                    )}
                </View>

                <Button
                    backgroundColor={NierTheme.colors.surface}
                    borderColor={NierTheme.colors.border}
                    borderWidth={2}
                    pressStyle={{
                        backgroundColor: NierTheme.colors.surfaceElevated,
                        borderColor: NierTheme.colors.accent,
                    }}
                    size="$4"
                    onPress={handleSubmit(onValidForm)}
                    style={styles.submitButton}
                >
                    <ThemedText style={NierStyles.buttonText}>
                        EXECUTE_AUTHENTICATION
                    </ThemedText>
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: { // Appliqué à SafeAreaView
        flex: 1,
        // backgroundColor est déjà dans NierStyles.container
        justifyContent: 'center', // Centrer le formulaire verticalement
        alignItems: 'center',     // Centrer le formulaire horizontalement
    },
    formContainer: { // Le conteneur principal du formulaire
        width: '90%', // Limiter la largeur du formulaire pour un meilleur aspect
        maxWidth: 400, // Largeur maximale pour les grands écrans
        padding: NierTheme.spacing.lg,
        backgroundColor: NierTheme.colors.surface, // Fond de la "carte" de formulaire
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
        // Pour un effet "carte" plus prononcé, si souhaité :
        // borderLeftWidth: 3,
        // borderLeftColor: NierTheme.colors.accent,
        gap: NierTheme.spacing.md,
    },
    pageTitle: {
        textAlign: 'center',
        marginBottom: NierTheme.spacing.lg, // Espace sous le titre
        color: NierTheme.colors.text,
        fontFamily: NierTheme.typography.fontFamily, // Assurer la police Nier
    },
    inputGroup: { // Conteneur pour label + input + message d'erreur
        width: '100%',
    },
    label: {
        marginBottom: NierTheme.spacing.sm,
        fontSize: NierTheme.typography.sizes.sm,
        color: NierTheme.colors.textMuted,
        fontFamily: NierTheme.typography.fontFamily,
        textTransform: 'uppercase',
    },
    errorMessage: {
        color: NierTheme.colors.error,
        fontSize: NierTheme.typography.sizes.xs,
        marginTop: NierTheme.spacing.xs,
        textAlign: 'right',
        fontFamily: NierTheme.typography.fontFamily,
    },
    submitButton: { // Pour la marge et la largeur du bouton
        marginTop: NierTheme.spacing.md,
        width: '100%',
    },
    // NierStyles.buttonText est utilisé directement dans le ThemedText du bouton
});