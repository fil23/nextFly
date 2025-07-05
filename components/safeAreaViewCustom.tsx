import React, { Children } from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../constants/theme/theme";

interface MyProps {
  children: React.ReactNode;
  style?: {};
}
export const SafeAreaViewCustom: React.FC<MyProps> = (props): JSX.Element => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);

  return (
    <SafeAreaView style={[styles.container, props.style]}>{props.children}</SafeAreaView>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 50,
      backgroundColor: theme.colors.background,
    },
  });
