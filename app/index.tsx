import { Stack, useNavigation } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline'
import TimeRow from '@/components/TimeRow';
import { vakitler as vakitResults } from '@/services/vakitler';
import { CurrentVakitType } from '@/types/CurrentVakitType';


const today = new Date();
const todayString = today.toLocaleDateString("tr-TR", { year: 'numeric', month: '2-digit', day: '2-digit' });
console.log(todayString);
const todaysData = vakitResults.find(v => v.MiladiTarihKisa === todayString);
if (!todaysData) {
  console.error('Vakitler bulunamadı');
}
const vakitler = [
  { name: 'İmsak', time: todaysData?.Imsak || '04:00' },
  { name: 'Güneş', time: todaysData?.Gunes || '06:00' },
  { name: 'Öğle', time: todaysData?.Ogle || '13:00' },
  { name: 'İkindi', time: todaysData?.Ikindi || '16:00' },
  { name: 'Akşam', time: todaysData?.Aksam || '19:00' },
  { name: 'Yatsı', time: todaysData?.Yatsi || '21:00' },
];

const getNextVakitIndex = (currentVakitIndex: number) => {
  return currentVakitIndex === 5 ? 0 : currentVakitIndex + 1;
}

const calculateTimeRemaining = (currentVakitIndex: number) => {
  const now = new Date();
  const nextVakitTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    currentVakitIndex === 5 ? now.getDate() + 1 : now.getDate(),
    parseInt(vakitler[getNextVakitIndex(currentVakitIndex)].time.split(':')[0]),
    parseInt(vakitler[getNextVakitIndex(currentVakitIndex)].time.split(':')[1]),
    0
  );
  const diff = nextVakitTime.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
};

const getCurrentVakit = (time: Date) => {
  const timeString = time.toTimeString().split(' ')[0].split(':').join('');
  const imsak = vakitler[0].time.split(':').join('');
  const gunes = vakitler[1].time.split(':').join('');
  const ogle = vakitler[2].time.split(':').join('');
  const ikindi = vakitler[3].time.split(':').join('');
  const aksam = vakitler[4].time.split(':').join('');
  const yatsi = vakitler[5].time.split(':').join('');

  const currentVakit: CurrentVakitType = { vakitName: 'yatsi', vakitIndex: 5 };
  if (timeString < imsak) {
    return currentVakit;
  }
  if (timeString < gunes) {
    currentVakit.vakitName = 'imsak';
    currentVakit.vakitIndex = 0;
    return currentVakit;
  }
  if (timeString < ogle) {
    currentVakit.vakitName = 'gunes';
    currentVakit.vakitIndex = 1;
    return currentVakit;
  }
  if (timeString < ikindi) {
    currentVakit.vakitName = 'ogle';
    currentVakit.vakitIndex = 2;
    return currentVakit;
  }
  if (timeString < aksam) {
    currentVakit.vakitName = 'ikindi';
    currentVakit.vakitIndex = 3;
    return currentVakit;
  }
  if (timeString < yatsi) {
    currentVakit.vakitName = 'aksam';
    currentVakit.vakitIndex = 4;
    return currentVakit;
  }
  return currentVakit;
}

export default function Home() {
  let now = new Date();
  const navigation = useNavigation();
  const [currentVakitObject, setCurrentVakitObject] = useState(getCurrentVakit(now));
  let currentVakit = currentVakitObject.vakitName;
  let currentVakitIndex = currentVakitObject.vakitIndex;

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(currentVakitIndex));
  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = new Date();
      const newCurrentVakitObject = getCurrentVakit(newNow);
      if (newNow.getMinutes() === now.getMinutes()) return;
      updateTimeRemaining(newNow, newCurrentVakitObject)
      if (newCurrentVakitObject.vakitName === currentVakit) return;
      updateCurrentVakit(newCurrentVakitObject);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTimeRemaining = (newNow: Date, newCurrentVakitObject: CurrentVakitType) => {
    now = newNow;
    setTimeRemaining(calculateTimeRemaining(newCurrentVakitObject.vakitIndex));
  }

  const updateCurrentVakit = (newCurrentVakitObject: CurrentVakitType) => {
    console.log(newCurrentVakitObject.vakitName, currentVakit, now);
    currentVakit = newCurrentVakitObject.vakitName;
    currentVakitIndex = newCurrentVakitObject.vakitIndex;
    setCurrentVakitObject(newCurrentVakitObject);
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ThemedView vakit={currentVakit} colorName={"background"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <ThemedView colorName={"background"}> */}
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 50,
            flexDirection: 'row',
            backgroundColor: Colors[currentVakit][2],
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          onPress={() => alert('Settings')}>
          <AdjustmentsHorizontalIcon color={Colors[currentVakit].text} size={20} />
          <ThemedText vakit={currentVakit} type="default">DENIZLI</ThemedText>
        </TouchableOpacity>
        {/* </ThemedView> */}
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
          <ThemedText vakit={currentVakit} size='lg' weight='medium'>{vakitler[getNextVakitIndex(currentVakitIndex)].name} Vaktine</ThemedText>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', gap: 2 }}>
            {timeRemaining.hours !== 0 && (
              <>
                <ThemedText vakit={currentVakit} size='5xl' weight='semibold' >{timeRemaining.hours}</ThemedText>
                <ThemedText vakit={currentVakit} size='5xl' weight='light' >sa</ThemedText>
                <View style={{ width: 8 }} />
              </>
            )}

            <ThemedText vakit={currentVakit} size='5xl' weight='semibold' >{timeRemaining.minutes}</ThemedText>
            <ThemedText vakit={currentVakit} size='5xl' weight='light' >dk</ThemedText>
          </View>
        </View>
        {
          vakitler.map((v, i) => (
            <TimeRow
              key={i}
              currentVakit={currentVakit}
              isCurrent={currentVakitIndex === i}
              vakit={v}
              index={i}
              delay={calculateDelay(i)}
            />
          ))
        }
      </SafeAreaView>
      <ThemedView vakit={currentVakit} colorName={"bottom"} style={{ height: 34, width: '100%' }} />
    </ThemedView>
  );

  function calculateDelay(i: number) {
    switch (i) {
      case 0:
        return 500;
      case 1:
        return 400;
      case 2:
        return 300;
      case 3:
        return 200;
      case 4:
        return 100;
      case 5:
        return 0;
      default:
        return 0;
    }
  }
}

