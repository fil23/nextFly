import React from "react";
import { useAuth } from "../configurations/contexts/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./public/AuthStack";
import { HomeStackNavigator } from "./private/privateRoutes";
import { SplashScreen } from "../pages/splash/splashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../constants/theme/theme";
import { Logo_header } from "../components/header/logo_header";
import { Icon, IconButton } from "react-native-paper";
const Tab = createBottomTabNavigator();
export const Route = () => {
  const { token, onLoad } = useAuth();
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <NavigationContainer>
      {onLoad ? (
        <SplashScreen />
      ) : token != null ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveBackgroundColor: theme.colors.background,
            headerShown: false,
            tabBarActiveTintColor: theme.colors.text,
            tabBarInactiveTintColor: theme.colors.text,
          }}
        >
          <Tab.Screen
            name="homeTab"
            component={HomeStackNavigator}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ focused }) => {
                return <IconButton icon={focused ? "home" : "home-outline"} />;
              },
              tabBarStyle: {
                borderTopWidth: 1,
                borderColor: "black",
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
