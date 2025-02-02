import React, { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Divider, Surface, Text } from "react-native-paper";

interface MyProps {
  img: string;
  city: string;
}
interface MyTravelsProps {
  data: {
    id: number;
    title: string;
    img: string;
    subtitle: string;
  };
}
// Cards which you can find in Home page under Discover a new place
export const CoverCards: FC<MyProps> = (props): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  return (
    <Surface elevation={2} style={styles.card}>
      <ImageBackground
        source={{ uri: props.img }}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ borderRadius: 20 }}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <Text style={styles.card_title} variant="titleMedium">
        {props.city}
      </Text>
    </Surface>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    card: {
      width: "100%",
      maxHeight: 150,
      minHeight: 100,
      borderRadius: 20,
      justifyContent: "center",
      marginHorizontal: 10,
      shadowColor: theme.colors.elevation,
    },

    card_title: {
      position: "absolute",
      textAlign: "center",
      alignSelf: "center",
      flexWrap: "wrap",
      color: theme.colors.title,
      textShadowColor: theme.colors.black,
      textShadowOffset: {
        width: 1,
        height: 1,
      },
      textShadowRadius: 1,
    },
  });

// cards which you can find it in my travels page i section menu
export const MytravelsCard: FC<MyTravelsProps> = (props): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createMytravelStyle(theme);
  return (
    <TouchableOpacity onPress={() => console.log("card press")}>
      <View style={styles.card_container} key={props.data.id}>
        <View style={styles.card_img}>
          <ImageBackground
            source={{ uri: props.data.img }}
            style={{ width: "100%", height: "100%" }}
            imageStyle={{ borderRadius: 15 }}
          />
        </View>
        <View style={{ flexWrap: "nowrap" }}>
          <Text variant="labelLarge" style={styles.card_title}>
            {props.data.title}
          </Text>
          <Text style={styles.card_subtitle}>{props.data.subtitle}</Text>
        </View>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};
const createMytravelStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    card_container: {
      width: "100%",
      height: 70,
      flexDirection: "row",
      marginHorizontal: 10,
      marginVertical: 10,
      gap: 20,
      paddingRight: 55,
    },
    card_img: {
      width: "30%",
      padding: 3,
      borderRadius: 15,
    },
    card_title: {
      marginVertical: 5,
      color: theme.colors.secondary,
    },
    card_subtitle: {
      width: "70%",
      marginRight: 5,
    },
  });
