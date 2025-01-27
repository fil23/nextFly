import React, { Children } from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../constants/theme/theme";

interface MyProps {
  children: React.ReactNode;
}
export const SafeAreaViewCustom: React.FC<MyProps> = ({
  children,
}): JSX.Element => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: theme.colors.background,
    },
  });
