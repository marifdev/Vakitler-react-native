import { Link, Stack, useNavigation } from 'expo-router';
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline'
import TimeRow from '@/components/TimeRow';
import { CurrentVakitType } from '@/types/CurrentVakitType';
import * as SecureStore from 'expo-secure-store';
import { Ilce } from '@/types/Ilce';
import { Data, VakitData } from '@/types/VakitData';

const today = new Date();
const todayString = today.toLocaleDateString("tr-TR", { year: 'numeric', month: '2-digit', day: '2-digit' });

const getNextVakitIndex = (currentVakitIndex: number) => {
  return currentVakitIndex === 5 ? 0 : currentVakitIndex + 1;
}

export default function Home() {
  const [data, setData] = useState<Data>();
  const [todaysData, setTodaysData] = useState<VakitData>();
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentVakit = (time: Date, todaysVakit: VakitData) => {
    const timeString = time.toTimeString().split(' ')[0].split(':').join('');
    const imsak = todaysVakit.Imsak.split(':').join('');
    const gunes = todaysVakit.Gunes.split(':').join('');
    const ogle = todaysVakit.Ogle.split(':').join('');
    const ikindi = todaysVakit.Ikindi.split(':').join('');
    const aksam = todaysVakit.Aksam.split(':').join('');
    const yatsi = todaysVakit.Yatsi.split(':').join('');

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

  const calculateTimeRemaining = (currentVakitIndex: number, vakitler: { name: string, time: string }[]) => {
    const now = new Date();
    const nextVakitTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      // if current vakit is yatsi and time is before midnight, set next day
      (currentVakitIndex === 5 && now.getHours() > parseInt(vakitler[0].time.split(':')[0])) ? now.getDate() + 1 : now.getDate(),
      parseInt(vakitler[getNextVakitIndex(currentVakitIndex)].time.split(':')[0]),
      parseInt(vakitler[getNextVakitIndex(currentVakitIndex)].time.split(':')[1]),
      0
    );
    const diff = nextVakitTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  let now = new Date();

  const [selectedDistrict, setSelectedDistrict] = useState<Ilce>();

  useEffect(() => {
    getSelectedDistrict();
  }, []);

  const getSelectedDistrict = async () => {
    const selectedDistrict = await SecureStore.getItemAsync('selectedDistrict');
    if (!selectedDistrict) {
      setSelectedDistrict({
        IlceAdi: 'İSTANBUL',
        IlceID: '9541',
        IlceAdiEn: 'ISTANBUL',
      });
    } else {
      setSelectedDistrict(JSON.parse(selectedDistrict));
    }
  }

  useEffect(() => {
    if (!selectedDistrict) return;
    fetch(`https://ezanvakti.herokuapp.com/vakitler?ilce=${selectedDistrict.IlceID}`)
      .then((res) => res.json())
      .then((data) => {
        findTodaysVakit(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedDistrict]);

  const findTodaysVakit = (vakitler: any) => {
    const todaysVakit: VakitData = vakitler.find((v: any) => v.MiladiTarihKisa === todayString);
    if (!todaysVakit) {
      console.error('Vakitler bulunamadı');
      return;
    }
    setTodaysData(todaysVakit);
    const dataObject: Data = {
      currentVakit: todaysVakit,
      currentVakitIndex: 0,
      currentVakitName: 'imsak',
      nextVakitIndex: 1,
      nextVakitName: 'gunes',
      vakitler: [
        { name: 'İmsak', time: '04:00' },
        { name: 'Güneş', time: '06:00' },
        { name: 'Öğle', time: '13:00' },
        { name: 'İkindi', time: '16:00' },
        { name: 'Akşam', time: '19:00' },
        { name: 'Yatsı', time: '21:00' },
      ],
      timeRemaining: { hours: 0, minutes: 0 },
    };

    dataObject.vakitler = [
      { name: 'İmsak', time: todaysVakit.Imsak },
      { name: 'Güneş', time: todaysVakit.Gunes },
      { name: 'Öğle', time: todaysVakit.Ogle },
      { name: 'İkindi', time: todaysVakit.Ikindi },
      { name: 'Akşam', time: todaysVakit.Aksam },
      { name: 'Yatsı', time: todaysVakit.Yatsi },
    ];
    dataObject.currentVakitName = getCurrentVakit(new Date(), todaysVakit).vakitName;
    dataObject.currentVakitIndex = getCurrentVakit(new Date(), todaysVakit).vakitIndex;
    dataObject.nextVakitIndex = getNextVakitIndex(dataObject.currentVakitIndex);
    dataObject.timeRemaining = calculateTimeRemaining(dataObject.currentVakitIndex, dataObject.vakitler);
    dataObject.currentVakit = todaysVakit;

    setData(dataObject);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!data) return;
    let currentVakit = data.currentVakitName;
    const interval = setInterval(() => {
      const newNow = new Date();
      const newCurrentVakitObject = getCurrentVakit(newNow, todaysData!);
      if (newNow.getMinutes() === now.getMinutes()) return;
      updateTimeRemaining(newNow, newCurrentVakitObject)
      if (newCurrentVakitObject.vakitName === currentVakit) return;
      updateCurrentVakit(newCurrentVakitObject);
    }, 1000);
    setIsLoading(false);
    return () => clearInterval(interval);
  }, [data]);

  const updateTimeRemaining = (newNow: Date, newCurrentVakitObject: CurrentVakitType) => {
    now = newNow;
    setData({
      ...data!,
      timeRemaining: calculateTimeRemaining(newCurrentVakitObject.vakitIndex, data!.vakitler),
    });
  }

  const updateCurrentVakit = (newCurrentVakitObject: CurrentVakitType) => {
    setData({
      ...data!,
      currentVakitName: newCurrentVakitObject.vakitName,
      currentVakitIndex: newCurrentVakitObject.vakitIndex,
      nextVakitIndex: getNextVakitIndex(newCurrentVakitObject.vakitIndex),
    });
  }

  return (
    isLoading ? <Text>Loading...</Text> :
      <ThemedView vakit={data!.currentVakitName} colorName={"background"} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* <ThemedView colorName={"background"}> */}
          <Link href="/(settings)" asChild>
            <Pressable
              style={{
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 50,
                flexDirection: 'row',
                backgroundColor: Colors[data!.currentVakitName][2],
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <AdjustmentsHorizontalIcon color={Colors[data!.currentVakitName].text} size={20} />
              <ThemedText vakit={data!.currentVakitName} type="default">{selectedDistrict?.IlceAdi}</ThemedText>
            </Pressable>
          </Link>
          {/* </ThemedView> */}
          <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <ThemedText vakit={data!.currentVakitName} size='lg' weight='medium'>{data!.vakitler[getNextVakitIndex(data!.currentVakitIndex)].name} Vaktine</ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', gap: 2 }}>
              {data!.timeRemaining!.hours !== 0 && (
                <>
                  <ThemedText vakit={data!.currentVakitName} size='5xl' weight='semibold' >{data!.timeRemaining!.hours}</ThemedText>
                  <ThemedText vakit={data!.currentVakitName} size='5xl' weight='light' >sa</ThemedText>
                  <View style={{ width: 8 }} />
                </>
              )}

              <ThemedText vakit={data!.currentVakitName} size='5xl' weight='semibold' >{data!.timeRemaining!.minutes}</ThemedText>
              <ThemedText vakit={data!.currentVakitName} size='5xl' weight='light' >dk</ThemedText>
            </View>
          </View>
          {
            data!.vakitler.map((v, i) => (
              <TimeRow
                key={i}
                currentVakit={data!.currentVakitName}
                isCurrent={data!.currentVakitIndex === i}
                vakit={v}
                index={i}
                delay={calculateDelay(i)}
              />
            ))
          }
        </SafeAreaView>
        <ThemedView vakit={data!.currentVakitName} colorName={"bottom"} style={{ height: 34, width: '100%' }} />
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

