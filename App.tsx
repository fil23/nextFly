import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useColorScheme, Image } from "react-native";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./constants/theme/theme";
import * as Font from "expo-font";
import { AuthProvider } from "./configurations/contexts/authContext";
import { Route } from "./routes/routes";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadFonts();
  }, []);
  const loadFonts = async () => {
    await Font.loadAsync({
      "Montserrat-Bold": require("./assets/fonts/static/Montserrat-Bold.ttf"),
      "Montserrat-Black": require("./assets/fonts/static/Montserrat-Black.ttf"),
      "Montserrat-ExtraBold": require("./assets/fonts/static/Montserrat-ExtraBold.ttf"),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return null; // Mostra una schermata di caricamento se necessario
  }
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </PaperProvider>
  );
}
