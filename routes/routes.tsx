import React from "react";
import { useAuth } from "../configurations/contexts/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./public/AuthStack";
import { AppStack } from "./private/privateRoutes";
import { SplashScreen } from "../pages/splash/splashScreen";
export const Route = () => {
  const { token, onLoad } = useAuth();
  return (
    <NavigationContainer>
      {onLoad ? <SplashScreen /> : token != null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
