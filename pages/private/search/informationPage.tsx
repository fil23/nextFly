import React from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Text } from "react-native-paper";

export const InformationPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

  return (
    <SafeAreaViewCustom>
      <Text>Information page</Text>
    </SafeAreaViewCustom>
  );
};
