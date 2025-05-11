import React, { useEffect, useState } from "react";

import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SearchTypeList } from "./searchTypeList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GoogleGenAI, Modality } from "@google/genai";
import { useTravel } from "../../../configurations/contexts/travelContext";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { SplashScreen } from "../../splash/splashScreen";
import OpenAI from "openai";

type TravelProps = NativeStackScreenProps<SearchTypeList, "travelGenerated">;

export const TravelGenerated = ({ route, navigation }: TravelProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const { info } = useTravel();
  const travel = route.params.risposta;
  const [uriImage, setUriImage] = useState<string>("./../");
  const [onLoad, setOnLoad] = useState<boolean>(false);

  return (
    <>
      {onLoad ? (
        <SplashScreen />
      ) : (
        <ScrollView>
          {/* travel's cover */}
          <View style={styles.cover_container}>
            <ImageBackground
              source={{ uri: uriImage }}
              resizeMode="cover"
              imageStyle={{ height: "100%", width: "100%" }}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    cover_container: {
      flex: 0.5,
      position: "absolute",
      top: 0,
      left: 0,
    },
  });
