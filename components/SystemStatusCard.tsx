// components/SystemStatusCard.tsx
import React, { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';

interface SystemStatus {
    networkStatus: string;
    platform: string;
    screenDimensions: string;
    isConnected: boolean;
    connectionType: string;
}

export const SystemStatusCard: React.FC = () => {
    const [systemStatus, setSystemStatus] = useState<SystemStatus>({
        networkStatus: 'CHECKING...',
        platform: Platform.OS.toUpperCase(),
        screenDimensions: '',
        isConnected: false,
        connectionType: 'UNKNOWN'
    });

    useEffect(() => {
        // Informations d'écran
        const { width, height } = Dimensions.get('window');
        setSystemStatus(prev => ({
            ...prev,
            screenDimensions: `${Math.round(width)}x${Math.round(height)}`
        }));

        // État réseau en temps réel
        const unsubscribe = NetInfo.addEventListener(state => {
            setSystemStatus(prev => ({
                ...prev,
                networkStatus: state.isConnected ? 'CONNECTED' : 'DISCONNECTED',
                isConnected: state.isConnected || false,
                connectionType: state.type?.toUpperCase() || 'UNKNOWN'
            }));
        });

        return () => unsubscribe();
    }, []);

    // Simulation de données dynamiques (pour l'effet visuel)
    const [dynamicData, setDynamicData] = useState({
        memoryUsage: 67.3,
        missionQueue: 3,
        uptime: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicData(prev => ({
                memoryUsage: Math.round((Math.random() * 30 + 50) * 10) / 10, // 50-80%
                missionQueue: Math.floor(Math.random() * 5) + 1, // 1-5
                uptime: prev.uptime + 1
            }));
        }, 1000); // Mise à jour toutes les 5 secondes

        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <ThemedView variant="surface" style={GlobalStyles.statusCard}>
            <ThemedText type="system" style={GlobalStyles.statusText}>
                [SYSTEM_STATUS]{'\n'}
                ├── Core Functions: ONLINE{'\n'}
                ├── Memory Usage: {dynamicData.memoryUsage}%{'\n'}
                ├── Network Status: {systemStatus.networkStatus}{'\n'}
                ├── Connection Type: {systemStatus.connectionType}{'\n'}
                ├── Platform: {systemStatus.platform}{'\n'}
                ├── Screen: {systemStatus.screenDimensions}{'\n'}
                ├── Uptime: {formatUptime(dynamicData.uptime)}{'\n'}
                └── Mission Queue: {dynamicData.missionQueue} ACTIVE
            </ThemedText>
        </ThemedView>
    );
};