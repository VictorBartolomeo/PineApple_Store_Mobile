import { StyleSheet } from 'react-native';
import { NierTheme } from './NierTheme';

export const GlobalStyles = StyleSheet.create({
    // Conteneurs principaux
    safeContainer: {
        flex: 1,
        backgroundColor: NierTheme.colors.background,
    },

    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollContent: {
        padding: NierTheme.spacing.md,
        gap: NierTheme.spacing.md,
    },

    // Cards et surfaces
    headerCard: {
        padding: NierTheme.spacing.md,
        marginBottom: NierTheme.spacing.sm,
        backgroundColor: NierTheme.colors.surfaceElevated,
        borderWidth: 2,
        borderColor: NierTheme.colors.borderActive,
    },

    card: {
        padding: NierTheme.spacing.md,
        marginVertical: NierTheme.spacing.xs,
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
    },

    statusCard: {
        padding: NierTheme.spacing.md,
        marginTop: NierTheme.spacing.lg,
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
    },

    // Formulaires
    formContainer: {
        width: '90%',
        maxWidth: 400,
        padding: NierTheme.spacing.lg,
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
        gap: NierTheme.spacing.md,
    },

    inputGroup: {
        width: '100%',
    },

    // Layout
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: NierTheme.spacing.lg,
    },

    // Textes
    pageTitle: {
        textAlign: 'center',
        marginBottom: NierTheme.spacing.lg,
        color: NierTheme.colors.text,
        fontFamily: NierTheme.typography.fontFamily,
    },

    label: {
        marginBottom: NierTheme.spacing.sm,
        fontSize: NierTheme.typography.sizes.sm,
        color: NierTheme.colors.textMuted,
        fontFamily: NierTheme.typography.fontFamily,
        textTransform: 'uppercase',
    },

    errorMessage: {
        color: NierTheme.colors.error,
        fontSize: NierTheme.typography.sizes.xs,
        marginTop: NierTheme.spacing.xs,
        textAlign: 'right',
        fontFamily: NierTheme.typography.fontFamily,
    },

    systemInfo: {
        lineHeight: 16,
    },

    timestamp: {
        marginBottom: NierTheme.spacing.sm,
        opacity: 0.7,
    },

    missionText: {
        lineHeight: 18,
    },

    statusText: {
        lineHeight: 16,
        letterSpacing: 0.5,
    },

    // Boutons
    submitButton: {
        marginTop: NierTheme.spacing.md,
        width: '100%',
    },

    // Headers et images
    headerImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
    },


    // Test component specific
    testButton: {
        color: "white",
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        margin: 70,
        shadowColor: "white"
    },

    testNumber: {
        fontSize: 20,
        color: "black",
    }
});

// Objets de styles pour les inputs Tamagui (pour éviter la répétition)
export const TamaguiInputStyles = {
    backgroundColor: NierTheme.colors.surface,
    borderWidth: 2,
    color: NierTheme.colors.text,
    fontFamily: NierTheme.typography.fontFamily,
    fontSize: NierTheme.typography.sizes.md,
    paddingHorizontal: NierTheme.spacing.md,
    paddingVertical: NierTheme.spacing.sm,
    size: "$4" as const,
    placeholderTextColor: NierTheme.colors.textMuted,
};

export const TamaguiInputFocusStyle = {
    borderColor: NierTheme.colors.accent,
};

export const TamaguiButtonStyles = {
    backgroundColor: NierTheme.colors.surface,
    borderColor: NierTheme.colors.border,
    borderWidth: 2,
    size: "$4" as const,
};

export const TamaguiButtonPressStyle = {
    backgroundColor: NierTheme.colors.surfaceElevated,
    borderColor: NierTheme.colors.accent,
};