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
import { SignIn } from "./pages/public/signin";
import { FindPass } from "./pages/public/find_pass";

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
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.surface,
            },
            headerTintColor: theme.colors.text,
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
