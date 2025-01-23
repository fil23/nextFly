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
import { AddListType } from "../../pages/private/add/paramAddList";
import { AddPage } from "../../pages/private/add/addPage";

const HomeStack = createNativeStackNavigator<HomeListType>();
const ProfileStack = createNativeStackNavigator<ProfileListType>();
const AddStack = createNativeStackNavigator<AddListType>();

// Home navigation routes
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

// Profile navigation routes
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

// Add page navigation routes
export const AddStackNavigator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <AddStack.Navigator
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
      <AddStack.Screen name="add" component={AddPage} />
    </AddStack.Navigator>
  );
};
