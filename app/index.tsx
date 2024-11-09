import { Link, Stack, useNavigation } from 'expo-router';
import { Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
// import { View } from '@/components/View';
import { AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline'
import TimeRow from '@/components/TimeRow';
import { CurrentVakitType } from '@/types/CurrentVakitType';
import * as SecureStore from 'expo-secure-store';
import { Ilce } from '@/types/Ilce';
import { Data, VakitData } from '@/types/VakitData';
import React from 'react';
import SettingsButton from '@/components/SettingsButton';
import { PrayerName } from '@/enum/PrayerName';
import { getBackgroundColor, getBottomColor, getTextColor } from '@/shared/colorMethods';

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

    const currentVakit: CurrentVakitType = { vakitName: PrayerName.Yatsi, vakitIndex: 5 };
    if (timeString < imsak) {
      return currentVakit;
    }
    if (timeString < gunes) {
      currentVakit.vakitName = PrayerName.Imsak;
      currentVakit.vakitIndex = 0;
      return currentVakit;
    }
    if (timeString < ogle) {
      currentVakit.vakitName = PrayerName.Gunes;
      currentVakit.vakitIndex = 1;
      return currentVakit;
    }
    if (timeString < ikindi) {
      currentVakit.vakitName = PrayerName.Ogle;
      currentVakit.vakitIndex = 2;
      return currentVakit;
    }
    if (timeString < aksam) {
      currentVakit.vakitName = PrayerName.Ikindi;
      currentVakit.vakitIndex = 3;
      return currentVakit;
    }
    if (timeString < yatsi) {
      currentVakit.vakitName = PrayerName.Aksam;
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
      currentVakitName: PrayerName.Imsak,
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: getBackgroundColor() }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <SettingsButton selectedDistrict={selectedDistrict} />
          <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <ThemedText color={getTextColor()} size='lg' weight='medium'>{data!.vakitler[getNextVakitIndex(data!.currentVakitIndex)].name} Vaktine</ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', gap: 2 }}>
              {data!.timeRemaining!.hours !== 0 && (
                <>
                  <ThemedText color={getTextColor()} size='5xl' weight='semibold' >{data!.timeRemaining!.hours}</ThemedText>
                  <ThemedText color={getTextColor()} size='5xl' weight='light' >sa</ThemedText>
                  <View style={{ width: 8 }} />
                </>
              )}

              <ThemedText color={getTextColor()} size='5xl' weight='semibold' >{data!.timeRemaining!.minutes}</ThemedText>
              <ThemedText color={getTextColor()} size='5xl' weight='light' >dk</ThemedText>
            </View>
          </View>
          {
            data!.vakitler.map((v, i) => (
              <TimeRow
                key={i}
                currentVakit={PrayerName.Yatsi}
                isCurrent={data!.currentVakitIndex === i}
                vakit={v}
                index={i}
                delay={calculateDelay(i)}
              />
            ))
          }
        </SafeAreaView>
        <View style={{ height: 34, width: '100%', backgroundColor: getBottomColor() }} />
      </View>

  );

  function calculateDelay(index: number) {
    const delays = [500, 400, 300, 200, 100, 0];
    return delays[index] || 0;
  }
}

