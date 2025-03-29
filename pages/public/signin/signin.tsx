import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { FormSignIn } from "../../../components/froms/form_registrazione";
import { LoaderIndicator } from "../../../components/loaderIndicator";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { SignInTitles } from "../../../components/titles/signInTitles";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { useAuth } from "../../../configurations/contexts/authContext";

export const SignIn = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const image =
    colorScheme === "dark"
      ? require("../../../assets/img/Toky nights2.jpg")
      : require("../../../assets/img/signInBack.jpg");
  const { onLoad } = useAuth();
  return (
    <SafeAreaViewCustom>
      {onLoad ? (
        <LoaderIndicator /> /* <ImageBackground
        source={image}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      >*/
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          {/* Titolo della sign in page (welcome + nome app) */}
          <SignInTitles />
          <FormSignIn />
        </KeyboardAvoidingView>

        /*</ImageBackground> */
      )}
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
    },
  });
