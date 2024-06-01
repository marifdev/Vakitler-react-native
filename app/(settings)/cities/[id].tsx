import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const Cities = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Cities {id}</Text>
    </View>
  )
}

export default Cities