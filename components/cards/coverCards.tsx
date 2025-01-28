import React, { FC } from "react";
import { ImageBackground, StyleSheet, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Surface, Text } from "react-native-paper";

interface MyProps {
  img: string;
  city: string;
}

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
