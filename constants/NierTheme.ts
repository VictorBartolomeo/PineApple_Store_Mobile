export const NierTheme = {
    colors: {
        background: '#0a0a0a',
        surface: '#1a1a1a',
        surfaceElevated: '#222222',
        border: '#333333',
        borderActive: '#555555',
        text: '#ffffff',
        textSecondary: '#cccccc',
        textMuted: '#888888',
        accent: '#d4af37', // Gold accent like in Nier
        accentSecondary: '#8b7355',
        success: '#4CAF50',
        error: '#ff6b6b',
        warning: '#ff9800',
        glitch: '#ff4444',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    typography: {
        fontFamily: 'monospace',
        sizes: {
            xs: 10,
            sm: 12,
            md: 14,
            lg: 16,
            xl: 20,
            xxl: 24,
            title: 28,
            display: 32,
        },
    },
    animations: {
        duration: {
            fast: 150,
            normal: 300,
            slow: 500,
        },
    },
};

export const NierStyles = {
    container: {
        flex: 1,
        backgroundColor: NierTheme.colors.background,
    },
    surface: {
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
    },
    surfaceElevated: {
        backgroundColor: NierTheme.colors.surfaceElevated,
        borderWidth: 2,
        borderColor: NierTheme.colors.borderActive,
    },
    text: {
        color: NierTheme.colors.text,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.md,
    },
    textSecondary: {
        color: NierTheme.colors.textSecondary,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.sm,
    },
    textMuted: {
        color: NierTheme.colors.textMuted,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.xs,
    },
    title: {
        color: NierTheme.colors.text,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.title,
        fontWeight: 'bold' as const,
        textTransform: 'uppercase' as const,
        letterSpacing: 2,
    },
    subtitle: {
        color: NierTheme.colors.textSecondary,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.lg,
        fontWeight: '600' as const,
        textTransform: 'uppercase' as const,
        letterSpacing: 1,
    },
    button: {
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 2,
        borderColor: NierTheme.colors.border,
        paddingHorizontal: NierTheme.spacing.md,
        paddingVertical: NierTheme.spacing.sm,
    },
    buttonActive: {
        backgroundColor: NierTheme.colors.surfaceElevated,
        borderColor: NierTheme.colors.accent,
    },
    buttonText: {
        color: NierTheme.colors.text,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.md,
        fontWeight: 'bold' as const,
        textTransform: 'uppercase' as const,
        textAlign: 'center' as const,
    },
    input: {
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 2,
        borderColor: NierTheme.colors.border,
        color: NierTheme.colors.text,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.md,
        paddingHorizontal: NierTheme.spacing.md,
        paddingVertical: NierTheme.spacing.sm,
    },
    inputFocused: {
        borderColor: NierTheme.colors.accent,
    },
    card: {
        backgroundColor: NierTheme.colors.surface,
        borderWidth: 1,
        borderColor: NierTheme.colors.border,
        padding: NierTheme.spacing.md,
        marginVertical: NierTheme.spacing.xs,
    },
    separator: {
        height: 1,
        backgroundColor: NierTheme.colors.border,
        marginVertical: NierTheme.spacing.sm,
    },
    glitchText: {
        color: NierTheme.colors.glitch,
        fontFamily: NierTheme.typography.fontFamily,
        textShadow: '2px 0 0 #ff4444, -2px 0 0 #44ff44',
    },
    systemText: {
        color: NierTheme.colors.textMuted,
        fontFamily: NierTheme.typography.fontFamily,
        fontSize: NierTheme.typography.sizes.xs,
        fontWeight: '400' as const,
    },
    accentBorder: {
        borderLeftWidth: 3,
        borderLeftColor: NierTheme.colors.accent,
        paddingLeft: NierTheme.spacing.sm,
    },
    // Dans NierStyles ou GlobalStyles
    quizOption: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
    },
};