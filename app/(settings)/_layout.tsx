import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { Pressable } from 'react-native';

export default function RootLayout() {

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{
          headerTitle: 'Seçenekler', headerLeft: () => (
            <Link href="../" asChild>
              <Pressable>
                <XMarkIcon size={30} color="gray" />
              </Pressable>
            </Link>
          ),
        }} />
        <Stack.Screen name="country" options={{
          headerTitle: 'Ülke Seç',
        }} />
        <Stack.Screen name="cities/[id]" options={{
          headerTitle: 'Şehir Seç',
        }} />
      </Stack>
    </>
  );
}
