import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { countries } from '@/services/countries'
import { Link, useNavigation } from 'expo-router'
import { ChevronRightIcon } from 'react-native-heroicons/solid'
import { SearchBarCommands, SearchBarProps } from 'react-native-screens'
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack/types'

const Country = () => {

  return (
    <FlatList
      contentInsetAdjustmentBehavior='automatic'
      style={{ paddingHorizontal: 16, backgroundColor: 'white' }}
      data={countries}
      renderItem={({ item }) => (
        <Link href={`cities/${item.UlkeID}`} asChild>
          <TouchableOpacity
            style={styles.sectionItem}
          >
            <Text style={styles.itemText}>{item.UlkeAdi}</Text>
            <ChevronRightIcon size={18} color={'gray'} />
          </TouchableOpacity>
        </Link>
      )}
      keyExtractor={(item) => item.UlkeID}
    />

  )
}

const styles = StyleSheet.create({
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemText: {
    color: 'black',
    fontSize: 18,
  }
})

export default Country