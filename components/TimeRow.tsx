import { View, Text, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { Easing } from 'react-native-reanimated'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

type TimeRowProps = {
  currentVakit: keyof typeof Colors
  vakit: { name: string, time: string }
  isCurrent: boolean
  index: any,
  delay?: number
}

const TimeRow = ({ currentVakit, vakit, isCurrent, index, delay }: TimeRowProps) => {
  // const offset = new Animated.Value(300);
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
      <ThemedView vakit={currentVakit} colorName={index} style={{
        width: "100%",
        paddingHorizontal: 21,
        paddingVertical: 9,
        alignItems: "center"
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
          <ThemedText vakit={currentVakit} size='xl' weight='medium'>{vakit.name}</ThemedText>
          <ThemedText
            vakit={currentVakit}
            size='xl'
            style={{ fontVariant: ['tabular-nums'] }}
          >{vakit.time}</ThemedText>
        </View>
      </ThemedView>
    </Animated.View>
  )
}

export default TimeRow