// import { View, type ViewProps } from 'react-native';

// import { Colors } from '@/constants/Colors';

// export type ThemedViewProps = ViewProps & {
//   vakit: keyof typeof Colors;
//   colorName?: keyof typeof Colors.imsak & keyof typeof Colors.gunes;
//   lightColor?: string;
//   darkColor?: string;
// };

// export function ThemedView({ style, vakit, colorName, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
//   const backgroundColor = useThemeColor(vakit, colorName || 'background');

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }
