import { DarkTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { SkypeIndicator } from "react-native-indicators";

export const SplashScreen = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={theme.colors.primary} />
      {/* <SkypeIndicator color={theme.colors.secondary} /> */}
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
