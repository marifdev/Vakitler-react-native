import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { Pressable } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(settings)"
          options={{
            // Set the presentation mode to modal for our modal route.
            presentation: 'modal',
            headerTitle: 'Seçenekler',
            headerShown: false,
            //put close icon on the left. use heroicons cross icon and make it centered
            headerLeft: () => (
              <Link href="../" asChild>
                <Pressable>
                  <XMarkIcon size={32} color="gray" />
                </Pressable>
              </Link>
            ),
          }}
        />
        {/* <Stack.Screen name="country" /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
