import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "react-native-paper";
import {
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { CustomButtonYellow } from "../../../components/buttons/CustomButtonYellow";

export const SearchPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const navigate = useNavigation();
  const [search, setSearch] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const autiComplete = async () => {
    // @ts-ignore
  };

  useEffect(() => {
    if (search?.trim() == "" || search == null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [search]);

  return (
    // <SafeAreaView style={styles.main_container}>
    <View style={styles.main_container}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../../assets/img/backSearch.jpg")}
        imageStyle={{ position: "absolute", top: 0, left: 0 }}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      />
      <View style={styles.search_bar}>
        {/* Title */}
        <Text
          variant="displayMedium"
          style={{ color: theme.colors.secondary, paddingVertical: "10%" }}
        >
          Where is your place?
        </Text>
        {/* Google search bar for autocompletes */}
        <View>
          <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
              key: process.env.EXPO_PUBLIC_API_KEY_MAPS,
              language: "en",
              types: "(regions)",
            }}
            onPress={(data) => setSearch(data.description)}
            onFail={(error) => console.error(error)}
            autoFillOnNotFound
          />
          <CustomButtonYellow
            text="Search"
            style={styles.search_button}
            function={() =>
              navigate.navigate("information", {
                destination: search,
              })
            }
            disabled={disabled}
          />
        </View>
      </View>
      {/* <FAB
        icon="arrow-right-bold-outline"
        style={styles.button_next_page}
        color={theme.colors.black}
        size="medium"
        onPress={() => console.log("Next page")}
      /> */}
    </View>
    //</SafeAreaView>
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

    search_button: {
      marginHorizontal: "10%",
      marginTop: "7%",
    },
  });
