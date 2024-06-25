import { Link, Stack } from 'expo-router';
import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { Pressable } from 'react-native';
import React from 'react';

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
        <Stack.Screen name="districts/[id]" options={{
          headerTitle: 'Ilce Seç',
        }} />
      </Stack>
    </>
  );
}
