import React, { useState } from "react";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Searchbar, Text } from "react-native-paper";
import { StyleSheet, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";

export const CreateTravelsPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [city, setCity] = useState<string>("");
  return (
    <SafeAreaViewCustom>
      <Searchbar
        autoCapitalize="sentences"
        value={city}
        theme={theme}
        placeholder="Where is your place?"
        elevation={5}
        inputStyle={styles.search_bar_input}
        iconColor={theme.colors.secondary}
        cursorColor={theme.colors.secondary}
        multiline={false}
        placeholderTextColor={theme.colors.placeholder}
        maxLength={25}
        onChangeText={(text) => setCity(text)}
        clearButtonMode="always"
        collapsable={true}
        style={styles.searchbar}
      />
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    search_bar_input: {
      color: theme.colors.text,
      fontSize: 16,
      alignSelf: "center",
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
    searchbar: {
      backgroundColor: theme.colors.surface,
      minHeight: 40,
      maxHeight: 50,
    },
  });
