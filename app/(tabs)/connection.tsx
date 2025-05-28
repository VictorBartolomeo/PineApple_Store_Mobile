import { StyleSheet, Pressable, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NierTheme, NierStyles } from '@/constants/NierTheme';
import { TextInput } from 'react-native';
import { useState } from 'react';

export default function ConnectionScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');

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
            email: "",
            password: "",
        },
    })

    const onValidForm = async (data: FormData) => {
        setIsLoading(true);
        setConnectionStatus('connecting');

        try {
            const options: RequestInit = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            const response = await fetch("http://10.51.209.187:8080/login", options);
            const jwt = await response.text();

            console.log('JWT Token:', jwt);
            setConnectionStatus('success');
        } catch (error) {
            console.error('Connection error:', error);
            setConnectionStatus('error');
        } finally {
            setIsLoading(false);
        }
    }

    const getStatusMessage = () => {
        switch (connectionStatus) {
            case 'connecting':
                return '[STATUS] Establishing secure connection...\n[PROGRESS] Authenticating credentials...';
            case 'success':
                return '[STATUS] Connection established\n[ACCESS] Credentials verified\n[RESULT] Authentication successful';
            case 'error':
                return '[ERROR] Connection failed\n[CAUSE] Unable to reach authentication server\n[ACTION] Please verify credentials and try again';
            default:
                return '[SYSTEM] YoRHa Authentication Protocol\n[ACCESS] Restricted terminal - Credentials required\n[SECURITY] All connections are monitored';
        }
    };

    return (
        <SafeAreaView style={NierStyles.container}>
            <View style={styles.container}>
                {/* Header */}
                <ThemedView variant="elevated" style={styles.header}>
                    <ThemedText type="title" style={styles.title}>
                        AUTH_TERMINAL
                    </ThemedText>
                    <ThemedText type="system" style={styles.systemMessage}>
                        {getStatusMessage()}
                    </ThemedText>
                </ThemedView>

                {/* Login Form */}
                <ThemedView variant="card" style={styles.formContainer}>
                    <ThemedText type="subtitle" style={styles.formTitle}>
                        [AUTHENTICATION_REQUIRED]
                    </ThemedText>

                    {/* Email Input */}
                    <View style={styles.inputGroup}>
                        <ThemedText type="muted" style={styles.inputLabel}>
                            EMAIL_ADDRESS:
                        </ThemedText>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9