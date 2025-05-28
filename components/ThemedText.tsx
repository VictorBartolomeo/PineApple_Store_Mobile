import { StyleSheet, Text, type TextProps } from 'react-native';
import { NierTheme, NierStyles } from '@/constants/NierTheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'system' | 'glitch' | 'muted';
};

export function ThemedText({
                             style,
                             lightColor,
                             darkColor,
                             type = 'default',
                             ...rest
                           }: ThemedTextProps) {

  return (
      <Text
          style={[
            NierStyles.text,
            type === 'title' ? NierStyles.title : undefined,
            type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
            type === 'subtitle' ? NierStyles.subtitle : undefined,
            type === 'link' ? styles.link : undefined,
            type === 'system' ? NierStyles.systemText : undefined,
            type === 'glitch' ? NierStyles.glitchText : undefined,
            type === 'muted' ? NierStyles.textMuted : undefined,
            style,
          ]}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  defaultSemiBold: {
    fontSize: NierTheme.typography.sizes.md,
    fontWeight: '600',
    color: NierTheme.colors.textSecondary,
    fontFamily: NierTheme.typography.fontFamily,
  },
  link: {
    fontSize: NierTheme.typography.sizes.md,
    color: NierTheme.colors.accent,
    fontFamily: NierTheme.typography.fontFamily,
    textDecorationLine: 'underline',
  },
});