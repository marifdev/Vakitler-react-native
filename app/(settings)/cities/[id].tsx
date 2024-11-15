import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams } from 'expo-router';
import { City } from '@/types/City';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const Cities = () => {
  const { id } = useLocalSearchParams();
  const [cities, setCities] = React.useState<City[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`https://ezanvakti.herokuapp.com/sehirler/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data = data as City[];
        setCities(data);
        setLoading(false);
      });
  }, [id]);
  return loading ?
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View> :
    <FlatList
      contentInsetAdjustmentBehavior='always'
      style={{ paddingHorizontal: 16, backgroundColor: 'white' }}
      data={cities}
      renderItem={({ item }) => (
        <Link href={`districts/${item.SehirID}`} asChild>
          <TouchableOpacity
            style={styles.sectionItem}
          >
            <Text style={styles.itemText}>{item.SehirAdi}</Text>
            <ChevronRightIcon size={18} color={'gray'} />
          </TouchableOpacity>
        </Link>
      )}
      keyExtractor={(item) => item.SehirID}
    />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default Cities