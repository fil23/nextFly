import React, { FC } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

interface MyProps {
  testo: string;
}

export const CustomChip: FC<MyProps> = (props): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  return (
    <View
      style={[
        styles.chip_container,
        {
          backgroundColor:
            props.testo == "open"
              ? theme.colors.chip_success
              : theme.colors.chip_error,
        },
      ]}
    >
      <Text style={styles.card_info_text}>{props.testo}</Text>
    </View>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    chip_container: {
      paddingHorizontal: 7,
      borderRadius: 30,
    },
    card_info_text: {
      color: theme.colors.text,
      fontFamily: "Montserrat-Regular",
      fontSize: 12,
    },
  });
