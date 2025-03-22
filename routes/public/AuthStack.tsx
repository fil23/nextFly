import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Logo_header } from "../../components/header/logo_header";
import { Login } from "../../pages/public/login";
import { FindPass } from "../../pages/public/find_pass";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../configurations/contexts/authContext";
import { AuthListType } from "../../pages/public/params/AuthListType";
import { SignIn } from "../../pages/public/signin/signin";
import { EmailConfirm } from "../../pages/public/signin/email_conf";

const Stack = createNativeStackNavigator<AuthListType>();

const webClient = process.env.EXPO_PUBLIC_GOOGLE_WEB;
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS;
export const AuthStack = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const { setToken, setOnLoad } = useAuth();
  async function getToken() {
    const storedToken = await SecureStore.getItemAsync("token");
    setToken(storedToken);
    console.log("Token: " + storedToken);
  }

  useEffect(() => {
    setOnLoad(true);
    getToken();
    GoogleSignin.configure({
      webClientId: webClient,
      iosClientId: iosClientId,
      offlineAccess: true,
    });
    setOnLoad(false);
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerStyle: { backgroundColor: theme.colors.surface },
        animation: "ios_from_right",
        headerTitle: () => <Logo_header />,
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen
        name="email_conf"
        component={EmailConfirm}
        initialParams={{ email: "", password: "" }}
      />
      <Stack.Screen name="find_pass" component={FindPass} />
    </Stack.Navigator>
  );
};
