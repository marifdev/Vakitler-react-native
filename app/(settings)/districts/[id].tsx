import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import { Ilce } from '@/types/Ilce';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const Districts = () => {
  const { id } = useLocalSearchParams();
  const [cities, setCities] = React.useState<Ilce[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`https://ezanvakti.herokuapp.com/ilceler/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data = data as Ilce[];
        setCities(data);
        setLoading(false);
      });
  }, [id]);

  const storeSelectedDistrict = async (district: Ilce) => {
    //store to local device storage
    await SecureStore.setItemAsync('selectedDistrict', JSON.stringify(district));
    //close the modal
    router.replace('/');
  }

  return loading ?
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View> :
    <FlatList
      initialNumToRender={10}
      style={{ paddingHorizontal: 16, backgroundColor: 'white' }}
      data={cities}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.sectionItem}
          onPress={() => storeSelectedDistrict(item)}
        >
          <Text style={styles.itemText}>{item.IlceAdi}</Text>
          <ChevronRightIcon size={18} color={'gray'} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.IlceID}
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

export default Districts