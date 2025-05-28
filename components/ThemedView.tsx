import { View, type ViewProps } from 'react-native';
import { NierTheme } from '@/constants/NierTheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'surface' | 'elevated' | 'card';
};

export function ThemedView({
                             style,
                             lightColor,
                             darkColor,
                             variant = 'default',
                             ...otherProps
                           }: ThemedViewProps) {

  const getBackgroundColor = () => {
    switch (variant) {
      case 'surface':
        return NierTheme.colors.surface;
      case 'elevated':
        return NierTheme.colors.surfaceElevated;
      case 'card':
        return NierTheme.colors.surface;
      default:
        return NierTheme.colors.background;
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'surface':
        return {
          borderWidth: 1,
          borderColor: NierTheme.colors.border,
        };
      case 'elevated':
        return {
          borderWidth: 2,
          borderColor: NierTheme.colors.borderActive,
        };
      case 'card':
        return {
          borderWidth: 1,
          borderColor: NierTheme.colors.border,
          borderLeftWidth: 3,
          borderLeftColor: NierTheme.colors.accent,
        };
      default:
        return {};
    }
  };

  return (
      <View
          style={[
            { backgroundColor: getBackgroundColor() },
            getBorderStyle(),
            style
          ]}
          {...otherProps}
      />
  );
}