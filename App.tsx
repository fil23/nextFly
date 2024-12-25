import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useColorScheme, Image } from "react-native";
import Home from "./pages/home";
import { Details } from "./pages/details";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./constants/theme/theme";
import * as SecureStore from "expo-secure-store";
import { Login } from "./pages/public/login";
import { SignIn } from "./pages/public/signin";
import { FindPass } from "./pages/public/find_pass";
import { Logo_header } from "./components/header/logo_header";
import * as Font from "expo-font";

const Stack = createNativeStackNavigator();
export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [token, setToken] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  async function getToken() {
    setToken(await SecureStore.getItemAsync("token"));
  }
  const loadFonts = async () => {
    await Font.loadAsync({
      "Montserrat-Bold": require("./assets/fonts/static/Montserrat-Bold.ttf"),
      "Montserrat-Black": require("./assets/fonts/static/Montserrat-Black.ttf"),
      "Montserrat-ExtraBold": require("./assets/fonts/static/Montserrat-ExtraBold.ttf"),
    });
    setFontsLoaded(true);
  };
  useEffect(() => {
    getToken();
    loadFonts();
  });

  if (!fontsLoaded) {
    return null; // Mostra una schermata di caricamento se necessario
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTintColor: theme.colors.text,
            animation: "ios_from_right",
            headerTitle: "",

            headerRight: () => <Logo_header />,
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          {token == null ? (
            <>
              <Stack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="signin" component={SignIn} />
              <Stack.Screen name="find_pass" component={FindPass} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Details" component={Details} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
