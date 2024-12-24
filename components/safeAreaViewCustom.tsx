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

  return (
    <SafeAreaView
      style={[style.container, { backgroundColor: theme.colors.background }]}
    >
      {children}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
  },
});
