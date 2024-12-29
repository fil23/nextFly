import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Logo_header } from "../../components/header/logo_header";
import { Login } from "../../pages/public/login";
import { SignIn } from "../../pages/public/signin";
import { FindPass } from "../../pages/public/find_pass";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import Home from "../../pages/home";
import { Details } from "../../pages/details";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../configurations/contexts/authContext";

const Stack = createNativeStackNavigator();

const webClient = process.env.EXPO_PUBLIC_GOOGLE_WEB;
export const AuthStack = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const { setToken } = useAuth();
  async function getToken() {
    const storedToken = await SecureStore.getItemAsync("token");
    setToken(storedToken);
    console.log("Token: " + storedToken);
  }

  useEffect(() => {
    getToken();
    GoogleSignin.configure({
      webClientId: webClient,
      offlineAccess: true,
    });
  }, []);
  return (
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
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="find_pass" component={FindPass} />
    </Stack.Navigator>
  );
};
