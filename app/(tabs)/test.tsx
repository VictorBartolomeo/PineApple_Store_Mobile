import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import { UserCard } from "@/components/UserCard";
import { NierTheme, NierStyles } from '@/constants/NierTheme';

export function TestComponent() {
    const [numberClick, setNumberClick] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(users => {
                setUsers(users);
                setLoading(false);
            })
            .catch(error => {
                console.error('Data fetch error:', error);
                setLoading(false);
            });
    }, []);

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <ThemedView variant="elevated" style={styles.header}>
                <ThemedText type="system">
                    [TEST_MODULE] Interactive Component Analysis{'\n'}
                    [STATUS] Monitoring user interactions...
                </ThemedText>
            </ThemedView>

            {/* Interaction Counter */}
            <ThemedView variant="card" style={styles.counterSection}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    [INTERACTION_COUNTER]
                </ThemedText>

                <Pressable
                    style={[NierStyles.button, styles.actionButton]}
                    onPress={() => {
                        setNumberClick(numberClick + 1);
                        console.log('Click registered:', numberClick + 1);
                    }}
                >
                    <ThemedText style={NierStyles.buttonText}>
                        EXECUTE_PROTOCOL
                    </ThemedText>
                </Pressable>

                <ThemedView style={styles.displayContainer}>
                    <ThemedText type="muted">CURRENT_COUNT:</ThemedText>
                    <ThemedText style={styles.counterDisplay}>{numberClick}</ThemedText>
                </ThemedView>
            </ThemedView>

            {/* User Data Section */}
            <ThemedView variant="card" style={styles.dataSection}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                    [USER_DATABASE] Remote Data Stream
                </ThemedText>

                {loading ? (
                    <ThemedView style={styles.loadingContainer}>
                        <ThemedText type="system">
                            [LOADING] Fetching remote user data...{'\n'}
                            [STATUS] Establishing connection...
                        </ThemedText>
                    </ThemedView>
                ) : (
                    <>
                        <ThemedText type="muted" style={styles.dataInfo}>
                            Records Retrieved: {users.length}{'\n'}
                            Source: jsonplaceholder.typicode.com
                        </ThemedText>

                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.userItem}>
                                    <ThemedText type="muted" style={styles.userIndex}>
                                        [{String(index + 1).padStart(2, '0')}]
                                    </ThemedText>
                                    <UserCard user={item} />
                                </View>
                            )}
                            style={styles.userList}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                )}
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: NierTheme.spacing.md,
        gap: NierTheme.spacing.md,
    },
    header: {
        padding: NierTheme.spacing.md,
    },
    counterSection: {
        padding: NierTheme.spacing.md,
        alignItems: 'center',
    },
    sectionTitle: {
        alignSelf: 'flex-start',
        marginBottom: NierTheme.spacing.md,
    },
    actionButton: {
        paddingHorizontal: NierTheme.spacing.xl,
        paddingVertical: NierTheme.spacing.md,
        marginBottom: NierTheme.spacing.lg,
    },
    displayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: NierTheme.spacing.sm,
        padding: NierTheme.spacing.sm,
        backgroundColor: NierTheme.colors.background,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
    },
    counterDisplay: {
        fontSize: NierTheme.typography.sizes.xl,
        fontWeight: 'bold',
        color: NierTheme.colors.accent,
        fontFamily: NierTheme.typography.fontFamily,
    },
    dataSection: {
        flex: 1,
        padding: NierTheme.spacing.md,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataInfo: {
        marginBottom: NierTheme.spacing.md,
        lineHeight: 16,
    },
    userList: {
        flex: 1,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: NierTheme.spacing.xs,
        gap: NierTheme.spacing.sm,
    },
    userIndex: {
        minWidth: 30,
    },
});