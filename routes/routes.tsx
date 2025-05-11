import React from "react";
import { useAuth } from "../configurations/contexts/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./public/AuthStack";
import { SplashScreen } from "../pages/splash/splashScreen";
import { PrivateStack } from "./private/privateStack";
import { TravelProvider } from "../configurations/contexts/travelContext";

export const Route = () => {
  const { token, onLoad } = useAuth();

  return (
    <NavigationContainer>
      {onLoad ? (
        <SplashScreen />
      ) : token != null ? (
        <TravelProvider>
          <PrivateStack />
        </TravelProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
