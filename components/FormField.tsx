// components/FormField.tsx
import React from 'react';
import { View } from 'react-native';
import { Input } from 'tamagui';
import { Controller, Control, FieldError } from 'react-hook-form';
import { ThemedText } from '@/components/ThemedText';
import { NierTheme } from '@/constants/NierTheme';
import { GlobalStyles, TamaguiInputStyles, TamaguiInputFocusStyle } from '@/constants/GobalStyles';

interface FormFieldProps {
    name: string;
    label: string;
    placeholder: string;
    control: Control<any>;
    rules?: any;
    error?: FieldError;
    secureTextEntry?: boolean;
    keyboardType?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const FormField: React.FC<FormFieldProps> = ({
                                                        name,
                                                        label,
                                                        placeholder,
                                                        control,
                                                        rules,
                                                        error,
                                                        secureTextEntry = false,
                                                        keyboardType = 'default',
                                                        autoCapitalize = 'sentences'
                                                    }) => {
    return (
        <View style={GlobalStyles.inputGroup}>
            <ThemedText type="muted" style={GlobalStyles.label}>{label}</ThemedText>
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        {...TamaguiInputStyles}
                        borderColor={error ? NierTheme.colors.error : NierTheme.colors.border}
                        focusStyle={TamaguiInputFocusStyle}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType as any}
                        autoCapitalize={autoCapitalize}
                    />
                )}
                name={name}
            />
            {error && (
                <ThemedText style={GlobalStyles.errorMessage}>
                    [ERROR] {error.message}
                </ThemedText>
            )}
        </View>
    );
};