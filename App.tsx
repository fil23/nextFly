import React, { useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./constants/theme/theme";
import * as Font from "expo-font";
import { AuthProvider } from "./configurations/contexts/authContext";
import { Route } from "./routes/routes";
import Toast from "react-native-toast-message";
import { toastConfig } from "./constants/theme/toastConfiguration";
import { createClient } from "@supabase/supabase-js";
import { ErrorScreen } from "./pages/splash/errorScreen";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    //
    async function loadFonts() {
      await Font.loadAsync({
        Montserrat: require("./assets/fonts/static/Montserrat-Regular.ttf"),
        "Montserrat-Bold": require("./assets/fonts/static/Montserrat-Bold.ttf"),
        "Montserrat-ExtraBold": require("./assets/fonts/static/Montserrat-ExtraBold.ttf"),
        Myfont: require("./assets/fonts/Myfont-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    // async function deleteToken() {
    //   await SecureStore.deleteItemAsync("token");
    //   console.log("Token eliminato");
    // }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally render a loading screen
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Route />
        <Toast config={toastConfig} />
      </AuthProvider>
    </PaperProvider>
  );
}
