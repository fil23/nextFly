import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import Home from "./pages/home";
import { Details } from "./pages/details";
import { PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./constants/theme/theme";
import * as SecureStore from "expo-secure-store";
import { Login } from "./pages/public/login";

const Stack = createNativeStackNavigator();
export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [token, setToken] = useState<string | null>(null);

  async function getToken() {
    setToken(await SecureStore.getItemAsync("token"));
  }

  useEffect(() => {
    getToken();
  });
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {token == null ? (
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="login" component={Login} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.surface,
              },
              headerTitleStyle: {
                color: theme.colors.primary,
              },
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
