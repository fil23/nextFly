import React, { FC } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Button, Icon, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

interface MyProps {
  text: string;
  function: () => void;
  style?: {};
}

export const CustomButtonYellow: FC<MyProps> = (props): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <Button
      mode="elevated"
      buttonColor={theme.colors.secondary}
      onPress={props.function}
      style={props.style}
    >
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.secondary_text }}
      >
        {props.text}
      </Text>
    </Button>
  );
};
