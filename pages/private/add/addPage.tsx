import React, { useState } from "react";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Searchbar } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";

//TODO: Implement add page. (I need to think which parts implement in this page)
export const AddPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const [ricerca, setRicerca] = useState<string>("");
  const styles = createStyle(theme);
  return (
    <SafeAreaViewCustom>
      <Searchbar
        autoCapitalize="sentences"
        value={ricerca}
        theme={theme}
        placeholder="Where is your palce?"
        elevation={5}
        inputStyle={{
          color: theme.colors.text,
          fontSize: 16,
          alignSelf: "center",
          fontFamily: "Montserrat",
          fontWeight: 400,
        }}
        multiline={false}
        placeholderTextColor={theme.colors.placeholder}
        maxLength={25}
        onChangeText={(text) => setRicerca(text)}
        clearButtonMode="always"
        collapsable={true}
        style={styles.searchbar}
      />
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    searchbar: {
      backgroundColor: theme.colors.surface,
      minHeight: 40,
      maxHeight: 50,
      marginVertical: 15,
    },
  });
