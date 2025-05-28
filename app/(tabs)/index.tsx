import {Image} from 'expo-image';
import {Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {HelloWave} from '@/components/HelloWave';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {NierStyles, NierTheme} from '@/constants/NierTheme';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as SecureStore from "expo-secure-store";
import {useEffect} from "react";

export default function HomeScreen() {

    const jwt = SecureStore.getItem("token")

    useEffect(() => {

        if (jwt) {
            const options: RequestInit = {
                method: "GET",
                headers: {"Authorization": "Bearer " + jwt},
            }

            fetch("http://10.51.209.187:8080/coach/2/courses/upcoming", options)
                .then(response => response.json())
                .then(courses => {
                    console.log(courses)
                })
        }
    })


    return (
        <SafeAreaView style={NierStyles.container}>
            <ParallaxScrollView headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}} headerImage={
                <Image source={'@/assets/images/react-logo.png'} style={styles.missionHeader}/>
            }
            >
                <ThemedView variant="elevated" style={styles.headerCard}>
                    <ThemedText type="system" style={styles.systemInfo}>
                        [SYSTEM] YoRHa Interface v2.1.7{'\n'}
                        [STATUS] All systems operational{'\n'}
                        [USER] Welcome, Android
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">MAIN_TERMINAL</ThemedText>
                    <HelloWave/>
                </ThemedView>

                <ThemedView variant="card" style={styles.missionCard}>
                    <ThemedText type="subtitle" style={styles.missionHeader}>
                        [MISSION_001] Inner Peace Protocol
                    </ThemedText>
                    <ThemedText type="muted" style={styles.timestamp}>
                        TIMESTAMP: {new Date().toISOString().split('T')[0]}
                    </ThemedText>
                    <ThemedText style={styles.missionText}>
                        Objective: Maintain spiritual equilibrium while executing primary directives.
                        {'\n\n'}
                        Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to modify interface
                        parameters.
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

                <ThemedView variant="card" style={styles.missionCard}>
                    <ThemedText type="subtitle" style={styles.missionHeader}>
                        [MISSION_002] Network Restoration
                    </ThemedText>
                    <ThemedText type="muted" style={styles.timestamp}>
                        PRIORITY: HIGH
                    </ThemedText>
                    <ThemedText style={styles.missionText}>
                        Objective: Repair global network infrastructure and restore communication protocols.
                        {'\n\n'}
                        Navigate to Explore tab for detailed mission parameters and available resources.
                    </ThemedText>
                </ThemedView>

                <ThemedView variant="card" style={styles.missionCard}>
                    <ThemedText type="subtitle" style={styles.missionHeader}>
                        [MISSION_003] System Initialization
                    </ThemedText>
                    <ThemedText type="muted" style={styles.timestamp}>
                        STATUS: STANDBY
                    </ThemedText>
                    <ThemedText style={styles.missionText}>
                        Objective: Prepare for full system deployment.
                        {'\n\n'}
                        Execute command: <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>
                        {'\n'}
                        This will archive current configuration to <ThemedText
                        type="defaultSemiBold">app-example</ThemedText>
                        and initialize fresh deployment environment.
                    </ThemedText>
                </ThemedView>

                {/* System Status */}
                <ThemedView variant="surface" style={styles.statusCard}>
                    <ThemedText type="system" style={styles.statusText}>
                        [SYSTEM_STATUS]{'\n'}
                        ├── Core Functions: ONLINE{'\n'}
                        ├── Memory Usage: 67.3%{'\n'}
                        ├── Network Status: CONNECTED{'\n'}
                        └── Mission Queue: 3 ACTIVE
                    </ThemedText>
                </ThemedView>
            </ParallaxScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: NierTheme.spacing.md,
        gap: NierTheme.spacing.md,
    },
    headerCard: {
        padding: NierTheme.spacing.md,
        marginBottom: NierTheme.spacing.sm,
    },
    systemInfo: {
        lineHeight: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: NierTheme.spacing.lg,
    },
    missionCard: {
        padding: NierTheme.spacing.md,
        marginVertical: NierTheme.spacing.xs,
    },
    missionHeader: {
        marginBottom: NierTheme.spacing.xs,
    },
    timestamp: {
        marginBottom: NierTheme.spacing.sm,
        opacity: 0.7,
    },
    missionText: {
        lineHeight: 18,
    },
    statusCard: {
        padding: NierTheme.spacing.md,
        marginTop: NierTheme.spacing.lg,
    },
    statusText: {
        lineHeight: 16,
        letterSpacing: 0.5,
    },
});