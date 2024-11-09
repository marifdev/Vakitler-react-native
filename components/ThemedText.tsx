import { Text, type TextProps, StyleSheet } from 'react-native';

// import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { PrayerName } from '@/enum/PrayerName';

export type ThemedTextProps = TextProps & {
  color: string;
  size?: "sm" | "lg" | "xl" | "5xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  color = Colors[PrayerName.Imsak].text,
  type = 'default',
  size = 'sm',
  weight = 'medium',
  ...rest
}: ThemedTextProps) {

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