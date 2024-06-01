import { SectionList, View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MapPinIcon, BellIcon, ChevronRightIcon } from 'react-native-heroicons/solid'
export default function Settings() {
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <View style={{ flex: 1, }}>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>MEVCUT KONUM</Text>
        <Link href="/(settings)/country" asChild>
          <TouchableOpacity
            style={styles.sectionItem}
          >
            <View style={styles.itemLeading}>
              <MapPinIcon size={20} />
              <Text style={styles.itemText}>DENIZLI</Text>
            </View>
            <ChevronRightIcon size={18} />
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>BİLDİRİMLER</Text>
        <Link href="/(settings)/country" asChild>
          <TouchableOpacity
            style={styles.sectionItem}
          >
            <View style={styles.itemLeading}>
              <BellIcon size={20} color={'orange'} />
              <Text style={styles.itemText}>Bildirimler</Text>
            </View>
            <View style={styles.itemLeading}>
              <Text style={{ color: 'blue', fontSize: 18 }}>Açık</Text>
              <ChevronRightIcon size={18} />
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'flex-start',
    width: '100%',
  },
  sectionHeader: {
    color: 'gray',
    marginLeft: 20,
    fontWeight: 'semibold',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginTop: 4,
    borderRadius: 8,
  },
  itemLeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: 18,
  }
});
