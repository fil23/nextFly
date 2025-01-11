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

export const Login = () => {
  const slideAnim = useRef(new Animated.Value(1200)).current;
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [utente, setUtente] = useState<Utente | null>(null);
  const styles = createStyle(theme);
  useEffect(() => {
    // Avvia l'animazione al caricamento del componente
    Animated.timing(slideAnim, {
      toValue: 10, // Valore finale
      duration: 1000, // Durata in millisecondi
      useNativeDriver: true, // Usa il driver nativo per migliori performance
    }).start();
  }, [slideAnim]);
  return (
    <SafeAreaViewCustom>
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
            <Text style={styles.span} variant="displaySmall">
              NextFly
            </Text>
          </Animated.View>
        </Text>

        <Login_Form />
      </KeyboardAvoidingView>
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      gap: 20,
      paddingVertical: "30%",
    },
    title: {
      textAlign: "center",
      justifyContent: "center",
      color: theme.colors.text,
    },
    span: {
      color: theme.colors.secondary,
      letterSpacing: 2,
      fontFamily: "Montserrat-ExtraBold",
      textShadowColor: theme.colors.shadow,
      textShadowOffset: { width: 3, height: 1 },
      textShadowRadius: 1,
      paddingTop: 10,
    },
  });
