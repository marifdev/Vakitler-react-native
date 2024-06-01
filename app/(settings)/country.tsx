import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { countries } from '@/services/countries'
import { Link } from 'expo-router'
import { ChevronRightIcon } from 'react-native-heroicons/solid'

const Country = () => {
  return (
    <FlatList
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