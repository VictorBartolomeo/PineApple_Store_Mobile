
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NierTheme } from '@/constants/NierTheme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: NierTheme.colors.accent,
                tabBarInactiveTintColor: NierTheme.colors.textMuted,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: NierTheme.colors.surface,
                    borderTopColor: NierTheme.colors.border,
                },
                tabBarLabelStyle: {
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                },
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Terminal',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Data',
                    tabBarIcon: ({ color }) => <Ionicons name="server" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="CDAQuiz"
                options={{
                    title: 'Exam_Sim',
                    tabBarIcon: ({ color }) => <Ionicons name="school" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="connection"
                options={{
                    title: 'Auth',
                    tabBarIcon: ({ color }) => <Ionicons name="lock-closed" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}