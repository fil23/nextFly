import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Platform } from "react-native";
import { FormSignIn } from "../../../components/froms/form_registrazione";
import { LoaderIndicator } from "../../../components/loaderIndicator";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { SignInTitles } from "../../../components/titles/signInTitles";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";

export const SignIn = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [load, setOnload] = useState<boolean>(false);
  const image =
    colorScheme === "dark"
      ? require("../../../assets/img/Toky nights2.jpg")
      : require("../../../assets/img/signInBack.jpg");

  return (
    <SafeAreaViewCustom>
      {load ? (
        <LoaderIndicator /> /* <ImageBackground
        source={image}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      >*/
      ) : (
        <KeyboardAvoidingView style={styles.container}>
          {/* Titolo della sign in page (welcome + nome app) */}
          <SignInTitles />
          <FormSignIn load={load} setLoad={setOnload} />
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
