import React, { useEffect, useState } from "react";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Icon, IconButton, Text, TextInput } from "react-native-paper";
import { StyleSheet, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { v4 as uuidv4 } from "uuid";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const SearchPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [search, setSearch] = useState<string>("");
  const autiComplete = async () => {
    // @ts-ignore
  };
  useEffect(() => {}, [search]);
  return (
    <SafeAreaViewCustom style={styles.main_areaView}>
      {/* <TextInput
        label="Search your place..."
        mode="outlined"
        value={search}
        onChangeText={(text) => setSearch(text)}
        activeOutlineColor={theme.colors.secondary}
        style={styles.search_bar}
        left={
          <TextInput.Icon icon="magnify" size={25} color={theme.colors.text} />
        }
        right={
          <TextInput.Icon
            icon="close"
            size={25}
            color={theme.colors.text}
            onPress={() => setSearch("")}
          />
        }
      /> */}

      <View>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data) => {
            console.log(data);
          }}
          query={{
            key: process.env.API_KEY_MAPS,
            language: "en",
          }}
        />
      </View>
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    main_areaView: {
      paddingTop: "20%",
    },
    search_bar: {
      backgroundColor: theme.colors.background,
    },
  });
