import React, { useEffect, useRef } from "react";
import { Text } from "react-native-paper";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { SignInTitles } from "../../components/titles/signInTitles";
import { FormSignIn } from "../../components/froms/form_registrazione";

export const SignIn = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);

  const image =
    colorScheme === "dark"
      ? require("../../assets/img/Toky nights2.jpg")
      : require("../../assets/img/signInBack.jpg");
  return (
    <SafeAreaViewCustom>
      {/* <ImageBackground
        source={image}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      >*/}
      <View style={styles.container}>
        {/* Titolo della sign in page (welcome + nome app) */}
        <SignInTitles />
        <FormSignIn />
      </View>
      {/*</ImageBackground> */}
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 2,
      paddingTop: 30,
    },
  });
