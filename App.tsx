import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useColorScheme, Image } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./constants/theme/theme";
import * as Font from "expo-font";
import { AuthProvider, useAuth } from "./configurations/contexts/authContext";
import { Route } from "./routes/routes";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { toastConfig } from "./constants/theme/toastConfiguration";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Montserrat: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
        "Montserrat-Bold": require("./assets/fonts/static/Montserrat-Bold.ttf"),
        "Montserrat-ExtraBold": require("./assets/fonts/static/Montserrat-ExtraBold.ttf"),
      });
      setFontsLoaded(true);
    }
    // async function deleteToken() {
    //   await SecureStore.deleteItemAsync("token");
    //   console.log("Token eliminato");
    // }

    loadFonts();
    // deleteToken();
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
