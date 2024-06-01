import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  vakit: keyof typeof Colors,
  size?: "sm" | "lg" | "xl" | "5xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  vakit,
  type = 'default',
  size = 'sm',
  weight = 'medium',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    vakit,
    // vakit,
    "text"
  );

  return (
    <Text
      style={[
        { color },
        size === 'lg' ? { fontSize: 20 } : undefined,
        size === 'xl' ? { fontSize: 24 } : undefined,
        size === '5xl' ? { fontSize: 52 } : undefined,
        weight === 'light' ? { fontWeight: '300' } : undefined,
        weight === 'medium' ? { fontWeight: '500' } : undefined,
        weight === 'semibold' ? { fontWeight: '600' } : undefined,
        weight === 'bold' ? { fontWeight: 'bold' } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
