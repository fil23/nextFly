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

import { MyTravelsListType } from "../../pages/private/my_travels/paramTravelsList";
import { MyTravelsPage } from "../../pages/private/my_travels/my_travels";
import { CreateTravelsPage } from "../../pages/private/my_travels/create_travels";
import { SearchPage } from "../../pages/private/search/searchPage";
import { SearchTypeList } from "../../pages/private/search/searchTypeList";
import { InformationPage } from "../../pages/private/search/informationPage";
import { TravelGenerated } from "../../pages/private/search/travelGenerated";

const HomeStack = createNativeStackNavigator<HomeListType>();
const ProfileStack = createNativeStackNavigator<ProfileListType>();
const MyTravelsStack = createNativeStackNavigator<MyTravelsListType>();
const SearchStack = createNativeStackNavigator<SearchTypeList>();

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
      <HomeStack.Screen
        name="home"
        component={Home}
        options={{ title: "Home" }}
      />
      <HomeStack.Screen
        name="details"
        component={Details}
        options={({ route }) => ({
          title: route.params.viaggio.title,
          headerShown: true,
          headerTransparent: false,
          headerTintColor: theme.colors.title,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
        })}
      />
      <HomeStack.Screen
        name="profile"
        component={PublicProfilePage}
        options={({ route }) => ({
          title: route.params.utente,
        })}
      />
      <HomeStack.Screen
        name="search"
        component={SearchStackNavigator}
        options={{
          title: "",
          headerShown: false,
          headerTintColor: theme.colors.text,
        }}
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

// MyTravels navigation routes
export const MyTravelsStackNavigator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <MyTravelsStack.Navigator
      screenOptions={{
        animation: "ios_from_right",
        headerShown: false,
      }}
    >
      <MyTravelsStack.Screen
        name="myTravels"
        component={MyTravelsPage}
        options={{ title: "My travels" }}
      />
      <MyTravelsStack.Screen
        name="createTravel"
        component={CreateTravelsPage}
      />
      <MyTravelsStack.Screen
        name="search"
        component={SearchStackNavigator}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
        }}
      />
    </MyTravelsStack.Navigator>
  );
};

export const SearchStackNavigator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

  return (
    <SearchStack.Navigator
      screenOptions={{
        animation: "ios_from_right",
      }}
    >
      <SearchStack.Screen
        name="destination"
        component={SearchPage}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
        }}
      />
      <SearchStack.Screen
        name="information"
        component={InformationPage}
        options={({ route }) => ({
          title: route.params.destination,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
        })}
      />

      <SearchStack.Screen name="travelGenerated" component={TravelGenerated} />
    </SearchStack.Navigator>
  );
};
