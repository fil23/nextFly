import React from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Logo_header } from "../../components/header/logo_header";
import Home from "../../pages/home";
import { Details } from "../../pages/details";

const Stack = createNativeStackNavigator();
export const AppStack = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};
