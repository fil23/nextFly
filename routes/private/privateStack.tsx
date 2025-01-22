import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { HomeStackNavigator, ProfileStackNavigator } from "./privateRoutes";
import { IconButton } from "react-native-paper";

const Tab = createBottomTabNavigator();
export const PrivateStack = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: theme.colors.surface,
        headerShown: false,
        tabBarStyle: {
          elevation: 5,
          backgroundColor: theme.colors.surface,
          position: "absolute",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderTopWidth: 0,
        },
        freezeOnBlur: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 1,
          },
        },
        tabBarInactiveBackgroundColor: theme.colors.surface,
        tabBarButton: (props) => (
          <TouchableOpacity {...props}>
            <View>{props.children}</View>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="homeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ borderTopLeftRadius: 15 }}>
              <View>{props.children}</View>
            </TouchableOpacity>
          ),
          tabBarIconStyle: {
            alignSelf: "center",
            marginTop: 5,
          },
          tabBarIcon: ({ focused }) => {
            return (
              <IconButton
                icon={focused ? "home" : "home-outline"}
                iconColor={focused ? theme.colors.secondary : theme.colors.text}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={{ borderTopRightRadius: 10 }}>
              {props.children}
            </TouchableOpacity>
          ),

          tabBarLabel: "Profile",
          tabBarIconStyle: { alignSelf: "center", marginTop: 5 },
          tabBarIcon: ({ focused }) => {
            return (
              <IconButton
                icon={focused ? "account" : "account-outline"}
                iconColor={focused ? theme.colors.secondary : theme.colors.text}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
