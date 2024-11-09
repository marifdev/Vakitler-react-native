import { View, Text, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { ThemedText } from './ThemedText'
import { Easing } from 'react-native-reanimated'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
import { PrayerName } from '@/enum/PrayerName'
import { getBackgroundColor, getTextColor, getTimeColorByIndex } from '@/shared/colorMethods'

type TimeRowProps = {
  currentVakit: PrayerName,
  vakit: { name: string, time: string }
  isCurrent: boolean
  index: any,
  delay?: number
}

const TimeRow = ({ currentVakit, vakit, isCurrent, index, delay }: TimeRowProps) => {

  const opacity = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: delay,
      useNativeDriver: true
    }).start();
  }, [delay]);

  return (
    <Animated.View style={{ flexDirection: 'row', opacity }}>
      <View style={{
        width: "100%",
        paddingHorizontal: 21,
        paddingVertical: 9,
        alignItems: "center",
        backgroundColor: getTimeColorByIndex(index),
      }}>
        <View
          style={[
            isCurrent ? {
              borderWidth: 2,
              borderStyle: "solid",
              borderRadius: 20,
              borderColor: Colors[currentVakit].border,
            } : undefined,
            {
              padding: 16,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }]}
        >
          <ThemedText color={getTextColor()} size='xl' weight='medium'>{vakit.name}</ThemedText>
          <ThemedText
            color={getTextColor()}
            size='xl'
            style={{ fontVariant: ['tabular-nums'] }}
          >{vakit.time}</ThemedText>
        </View>
      </View>
    </Animated.View>
  )
}

export default TimeRow