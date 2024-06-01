/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  scheme: keyof typeof Colors,
  colorName: keyof typeof Colors.imsak & keyof typeof Colors.gunes
) {
  return Colors[scheme][colorName];
}
