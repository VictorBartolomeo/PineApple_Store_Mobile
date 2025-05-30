// components/MissionCard.tsx
import React from 'react';
import { Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';

export const MissionCard: React.FC = () => {
    return (
        <ThemedView variant="card" style={GlobalStyles.card}>
            <ThemedText type="subtitle">
                [MISSION_001] Inner Peace Protocol
            </ThemedText>
            <ThemedText type="muted" style={GlobalStyles.timestamp}>
                TIMESTAMP: {new Date().toISOString().split('T')[0]}
            </ThemedText>
            <ThemedText style={GlobalStyles.missionText}>
                Objective: Maintain spiritual equilibrium while executing primary directives.
                {'\n\n'}
                Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to modify interface parameters.
                {'\n\n'}
                Debug Console Access: {' '}
                <ThemedText type="defaultSemiBold">
                    {Platform.select({
                        ios: '[CMD + D]',
                        android: '[CMD + M]',
                        web: '[F12]',
                    })}
                </ThemedText>
            </ThemedText>
        </ThemedView>
    );
};