import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../constants/theme/theme";
export const LoaderIndicator = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.text} />
      <Text>Loading...</Text>
    </View>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
  });
