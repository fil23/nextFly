import React, { useEffect, useState } from "react";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Icon, IconButton, Text, TextInput } from "react-native-paper";
import {
  ImageBackground,
  StyleSheet,
  useColorScheme,
  Platform,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";

export const SearchPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigation();
  const autiComplete = async () => {
    // @ts-ignore
  };
  useEffect(() => {}, [search]);
  return (
    <KeyboardAvoidingView
      style={styles.main_container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        resizeMode="cover"
        resizeMethod="resize"
        source={require("../../../assets/img/Tokyo nights2jpg.jpg")}
        style={{ height: "100%", width: "100%" }}
      />
      <View style={styles.search_bar}>
        <Text
          variant="displayMedium"
          style={{ color: theme.colors.secondary, paddingVertical: "10%" }}
        >
          Where is your place?
        </Text>

        <View>
          <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
              key: process.env.EXPO_PUBLIC_API_KEY_MAPS,
              language: "en",
              types: "(regions)",
            }}
            onPress={(data) => console.log(data)}
            onFail={(error) => console.error(error)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    main_container: {
      alignItems: "center",
      flex: 1,
    },
    content_page: {
      position: "absolute",
    },
    search_bar: {
      width: "90%",
      position: "absolute",
      marginTop: "30%",
    },
  });
