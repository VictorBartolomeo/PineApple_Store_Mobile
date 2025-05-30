// components/WelcomeHeader.tsx
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';

export const WelcomeHeader: React.FC = () => {
    return (
        <ThemedView variant="elevated" style={GlobalStyles.headerCard}>
            <ThemedText type="system" style={GlobalStyles.systemInfo}>
                [SYSTEM] YoRHa Interface v2.1.7{'\n'}
                [STATUS] All systems operational{'\n'}
                [USER] Welcome, Android
            </ThemedText>
        </ThemedView>
    );
};