import React, { useEffect, useState } from "react";

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SearchTypeList } from "./searchTypeList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTravel } from "../../../configurations/contexts/travelContext";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { SplashScreen } from "../../splash/splashScreen";
import { IconButton } from "react-native-paper";

type TravelProps = NativeStackScreenProps<SearchTypeList, "travelGenerated">;

export const TravelGenerated = ({ route, navigation }: TravelProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const { info } = useTravel();
  const travel = route.params.risposta;
  const [uriImage, setUriImage] = useState<string>(
    "https://storage.googleapis.com/nextfly-bucket/nextfly-background/Tokyo%20nights2jpg.jpg"
  );
  const [onLoad, setOnLoad] = useState<boolean>(false);

  const modify_cover = () => {
    console.log("cover modificate");
  };
  return (
    <>
      {onLoad ? (
        <SplashScreen />
      ) : (
        <SafeAreaView style={styles.safe_area}>
          <ScrollView
            contentInsetAdjustmentBehavior="always"
            automaticallyAdjustsScrollIndicatorInsets
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {/* travel's cover */}
            <View style={styles.cover_container}>
              <ImageBackground
                source={{ uri: uriImage }}
                resizeMode="cover"
                imageStyle={{ height: "100%", width: "100%" }}
                style={styles.img_cover}
              />

              {/* Button to modify the travel's image  */}

              <IconButton
                icon="image-edit-outline"
                iconColor={theme.colors.yellow_star}
                size={35}
                style={styles.img_cover_button}
                onPress={modify_cover}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    safe_area: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    main_scroll: {
      backgroundColor: theme.colors.background,
    },
    cover_container: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxHeight: 300,
      minHeight: 200,
    },

    img_cover: {
      width: "100%",
      height: "100%",
    },

    img_cover_button: {
      position: "absolute",
      top: 10,
      right: 20,
    },
  });
