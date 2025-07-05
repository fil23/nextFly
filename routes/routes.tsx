import React, { useEffect } from "react";
import { useAuth } from "../configurations/contexts/authContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./public/AuthStack";
import { SplashScreen } from "../pages/splash/splashScreen";
import { PrivateStack } from "./private/privateStack";
import { TravelProvider } from "../configurations/contexts/travelContext";
import { supabase } from "../configurations/supabase_config";

export const Route = () => {
  const { onLoad, session } = useAuth();

  return (
    <NavigationContainer>
      {onLoad ? (
        <SplashScreen />
      ) : session && session.user ? (
        <TravelProvider>
          <PrivateStack />
        </TravelProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
