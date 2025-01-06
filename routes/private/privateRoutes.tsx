import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../pages/home/home";

import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Details } from "../../pages/home/details";
import { HomeListType } from "../../pages/home/paramHomeList";

const HomeStack = createNativeStackNavigator<HomeListType>();

export const HomeStackNavigator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: "ios_from_right",
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontFamily: "Montserrat-Bold",
        },
      }}
    >
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen
        name="details"
        component={Details}
        options={({ route }) => ({
          title: route.params.viaggio.title,
        })}
      />
    </HomeStack.Navigator>
  );
};
