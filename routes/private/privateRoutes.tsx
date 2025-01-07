import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../pages/private/home/home";

import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Details } from "../../pages/private/home/details";
import { HomeListType } from "../../pages/private/home/paramHomeList";
import { ProfileListType } from "../../pages/private/profile/paramProfileList";
import {
  PrivateProfilePage,
  PublicProfilePage,
} from "../../pages/private/profile/profile_page";

const HomeStack = createNativeStackNavigator<HomeListType>();
const ProfileStack = createNativeStackNavigator<ProfileListType>();

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
      <HomeStack.Screen
        name="profile"
        component={PublicProfilePage}
        options={({ route }) => ({
          title: route.params.utente,
        })}
      />
    </HomeStack.Navigator>
  );
};

export const ProfileStackNavigator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

  return (
    <ProfileStack.Navigator
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
      <ProfileStack.Screen name="profile" component={PrivateProfilePage} />
    </ProfileStack.Navigator>
  );
};
