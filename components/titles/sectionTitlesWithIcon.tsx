import React, { FC } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

interface MyProps {
  msg: string;
  icon: string;
}
export const SectionTitleIcon: FC<MyProps> = (props): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  return (
    <View style={styles.container}>
      <Avatar.Icon
        size={50}
        icon={props.icon}
        style={{ backgroundColor: theme.colors.background }}
        color={theme.colors.secondary}
      />
      <Text style={styles.section} variant="titleLarge">
        {props.msg}
      </Text>
    </View>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingVertical: 10,
      alignItems: "center",
      gap: 10,
    },
    section: {
      marginVertical: 20,
      textShadowColor: theme.colors.shadow,
      textShadowOffset: {
        width: 1,
        height: 2,
      },
      textShadowRadius: 1,
      color: theme.colors.text,
      width: "100%",
    },
  });
