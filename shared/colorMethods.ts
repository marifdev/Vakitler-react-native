import { PrayerName } from "@/enum/PrayerName";
import { Colors } from "@/constants/Colors";

export const getBackgroundColor = () => {
  return Colors[PrayerName.Yatsi].background;
}

export const getTextColor = () => {
  return Colors[PrayerName.Yatsi].text;
}

export const getBottomColor = () => {
  return Colors[PrayerName.Yatsi].bottom;
}

export const getTimeColorByIndex = (index: number) => {
  return Colors[PrayerName.Yatsi][index];
}