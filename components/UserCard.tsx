import { StyleSheet, View } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { User } from "@/models/User";
import { NierTheme } from '@/constants/NierTheme';

type UserCardProps = {
    user: User
}

export function UserCard({ user }: UserCardProps) {
    return (
        <ThemedView variant="surface" style={styles.card}>
            <View style={styles.header}>
                <ThemedText type="defaultSemiBold" style={styles.name}>
                    {user.name}
                </ThemedText>
                <ThemedText type="muted" style={styles.id}>
                    ID: {user.id.toString().padStart(3, '0')}
                </ThemedText>
            </View>

            <View style={styles.divider} />

            <View style={styles.details}>
                <View style={styles.detailRow}>
                    <ThemedText type="muted" style={styles.label}>USERNAME:</ThemedText>
                    <ThemedText style={styles.value}>{user.username}</ThemedText>
                </View>

                <View style={styles.detailRow}>
                    <ThemedText type="muted" style={styles.label}>EMAIL:</ThemedText>
                    <ThemedText style={styles.value}>{user.email}</ThemedText>
                </View>

                {user.phone && (
                    <View style={styles.detailRow}>
                        <ThemedText type="muted" style={styles.label}>PHONE:</ThemedText>
                        <ThemedText style={styles.value}>{user.phone}</ThemedText>
                    </View>
                )}

                {user.website && (
                    <View style={styles.detailRow}>
                        <ThemedText type="muted" style={styles.label}>WEBSITE:</ThemedText>
                        <ThemedText style={styles.value}>{user.website}</ThemedText>
                    </View>
                )}

                {user.company && (
                    <View style={styles.detailRow}>
                        <ThemedText type="muted" style={styles.label}>COMPANY:</ThemedText>
                        <ThemedText style={styles.value}>{user.company.name}</ThemedText>
                    </View>
                )}
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: NierTheme.spacing.md,
        marginVertical: NierTheme.spacing.xs,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: NierTheme.spacing.sm,
    },
    name: {
        flex: 1,
        textTransform: 'uppercase',
    },
    id: {
        backgroundColor: NierTheme.colors.background,
        paddingHorizontal: NierTheme.spacing.xs,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
    },
    divider: {
        height: 1,
        backgroundColor: NierTheme.colors.border,
        marginVertical: NierTheme.spacing.sm,
    },
    details: {
        gap: NierTheme.spacing.xs,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        minWidth: 80,
        fontSize: NierTheme.typography.sizes.xs,
    },
    value: {
        flex: 1,
        fontSize: NierTheme.typography.sizes.sm,
        marginLeft: NierTheme.spacing.sm,
    },
});