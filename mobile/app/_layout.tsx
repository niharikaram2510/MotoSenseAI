import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("motosense-theme");

        if (savedTheme === "light") {
          Appearance.setColorScheme("light");
        } else if (savedTheme === "dark") {
          Appearance.setColorScheme("dark");
        } else if (savedTheme === "system") {
          Appearance.setColorScheme(null);
        }
      } catch (error) {
        console.log("Failed to load saved theme:", error);
      } finally {
        setThemeReady(true);
      }
    };

    loadSavedTheme();
  }, []);

  // Wait until the saved theme has been loaded
  if (!themeReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="rider-profile" options={{ headerShown: false }} />

        <Stack.Screen name="connected-bike" options={{ headerShown: false }} />
        <Stack.Screen
          name="emergency-contacts"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
