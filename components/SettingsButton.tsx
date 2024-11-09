import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline'
import { Colors } from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { getTextColor } from '@/shared/colorMethods'
import { PrayerName } from '@/enum/PrayerName'

type SettingsButtonProps = {
  selectedDistrict: any
}
// This component is used to navigate to the settings page
const SettingsButton = ({
  selectedDistrict,
}: SettingsButtonProps) => {
  return (
    <Link href="/(settings)" asChild>
      <Pressable
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          borderRadius: 50,
          flexDirection: 'row',
          backgroundColor: Colors[PrayerName.Yatsi][2],
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <AdjustmentsHorizontalIcon color={Colors[PrayerName.Yatsi].text} size={20} />
        <ThemedText color={getTextColor()} type="default">{selectedDistrict?.IlceAdi}</ThemedText>
      </Pressable>
    </Link>
  )
}

export default SettingsButton