import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import { Login_Form } from "../../components/froms/form_login";
import { Platform } from "react-native";
import { LoaderIndicator } from "../../components/loaderIndicator";
import { useAuth } from "../../configurations/contexts/authContext";

export const Login = () => {
  const slideAnim = useRef(new Animated.Value(1200)).current;
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [utente, setUtente] = useState<Utente | null>(null);
  const [load, setOnload] = useState<boolean>(false);
  const styles = createStyle(theme);

  const auth = useAuth();
  useEffect(() => {
    // Avvia l'animazione al caricamento del componente
    Animated.timing(slideAnim, {
      toValue: 130, // Valore finale
      duration: 1000, // Durata in millisecondi
      useNativeDriver: true, // Usa il driver nativo per migliori performance
    }).start();
  }, [slideAnim]);

  // useEffect(() => {
  //   auth.signOutWithGoogle();
  // }, []);
  return (
    <SafeAreaViewCustom>
      {load ? (
        <LoaderIndicator />
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text variant="displaySmall" style={styles.title}>
            Welcome back to{" "}
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Text style={styles.span} variant="displayMedium">
                NextFly
              </Text>
            </Animated.View>
          </Text>

          <Login_Form load={load} setOnLoad={setOnload} />
        </KeyboardAvoidingView>
      )}
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      gap: 20,
      paddingVertical: "10%",
    },
    title: {
      textAlign: "center",
      maxHeight: "50%",
      minHeight: "20%",
      color: theme.colors.text,
    },
    span: {
      color: theme.colors.secondary,
      letterSpacing: 2,
      fontFamily: "Montserrat-ExtraBold",
      textShadowColor: theme.colors.shadow,
      textShadowOffset: { width: 3, height: 1 },
      paddingTop: 15,
      marginTop: "20%",
    },
  });
