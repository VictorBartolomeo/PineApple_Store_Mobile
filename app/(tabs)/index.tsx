import {Image} from 'expo-image';
import {Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {NierStyles, NierTheme} from '@/constants/NierTheme';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import {Course} from "@/models/Course";

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return date.toLocaleDateString('fr-FR', options);
};

const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const CourseCard = ({ course }: { course: Course }) => {
    const formattedDate = formatDate(course.startDatetime);
    const startTime = formatTime(course.startDatetime);
    const endTime = formatTime(course.endDatetime);

    const spotsLeft = course.maxCapacity - course.registrations.length;

    return (
        <ThemedView variant="card" style={styles.courseCard}>
            <ThemedText type="subtitle" style={styles.missionHeader}>
                [{course.courseType.name}] {course.title}
            </ThemedText>
            <ThemedText type="muted" style={styles.timestamp}>
                DATE: {formattedDate} • {startTime}-{endTime}
            </ThemedText>
            <ThemedText style={styles.missionText}>
                {course.description}
                {'\n\n'}
                <ThemedText type="system">
                    Places disponibles: {spotsLeft}/{course.maxCapacity}
                </ThemedText>
            </ThemedText>
        </ThemedView>
    );
};

export default function HomeScreen() {
    const [upcomingCourses, setUpcomingCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const jwt = await SecureStore.getItemAsync("token");

                if (jwt) {
                    const options: RequestInit = {
                        method: "GET",
                        headers: {"Authorization": "Bearer " + jwt},
                    };

                    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + "/coach/2/courses/upcoming", options);
                    const courses = await response.json();
                    setUpcomingCourses(courses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourses();
    }, []);

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

                {/* Section des cours à venir */}
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">COURS_À_VENIR</ThemedText>
                </ThemedView>

                {isLoading ? (
                    <ThemedView variant="surface" style={styles.statusCard}>
                        <ThemedText type="system">Chargement des cours...</ThemedText>
                    </ThemedView>
                ) : upcomingCourses.length > 0 ? (
                    upcomingCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <ThemedView variant="surface" style={styles.statusCard}>
                        <ThemedText type="system">Aucun cours à venir</ThemedText>
                    </ThemedView>
                )}

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
    courseCard: {
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