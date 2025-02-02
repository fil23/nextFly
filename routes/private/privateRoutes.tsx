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
import { MyTravelsListType } from "../../pages/private/my_travels/paramTravelsList";
import { MyTravelsPage } from "../../pages/private/my_travels/my_travels";

const HomeStack = createNativeStackNavigator<HomeListType>();
const ProfileStack = createNativeStackNavigator<ProfileListType>();
const AddStack = createNativeStackNavigator<AddListType>();
const MyTravelsStack = createNativeStackNavigator<MyTravelsListType>();

// Home navigation routes
export const HomeStackNavigator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <HomeStack.Navigator
      screenOptions={{
        animation: "ios_from_right",
        keyboardHandlingEnabled: true,
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen
        name="details"
        component={Details}
        options={({ route }) => ({
          title: route.params.viaggio.title,
          headerShown: true,
          headerTransparent: true,
          headerTintColor: theme.colors.title,
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
        // headerStyle: {
        //   backgroundColor: theme.colors.surface,
        // },
        // headerTintColor: theme.colors.text,
        // headerTitleStyle: {
        //   fontFamily: "Montserrat-Bold",
        // },
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="profile" component={PrivateProfilePage} />
    </ProfileStack.Navigator>
  );
};

// Add page navigation routes
export const AddStackNavigator = () => {
  return (
    <AddStack.Navigator
      screenOptions={{
        animation: "ios_from_right",
        headerShown: false,
      }}
    >
      <AddStack.Screen name="add" component={AddPage} />
    </AddStack.Navigator>
  );
};

// MyTravels navigation routes
export const MyTravelsStackNavigator = () => {
  return (
    <MyTravelsStack.Navigator
      screenOptions={{
        animation: "ios_from_right",
        headerShown: false,
      }}
    >
      <MyTravelsStack.Screen name="myTravels" component={MyTravelsPage} />
    </MyTravelsStack.Navigator>
  );
};
