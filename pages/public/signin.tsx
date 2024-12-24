import React, { useEffect, useRef } from "react";
import { Text } from "react-native-paper";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import { Animated, StyleSheet, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

export const SignIn = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const fadeAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    // Avvia l'animazione al caricamento del componente
    Animated.timing(fadeAnim, {
      toValue: 0, // Valore finale
      duration: 1000, // Durata in millisecondi
      useNativeDriver: true, // Usa il driver nativo per migliori performance
    }).start();
  }, [fadeAnim]);
  return (
    <SafeAreaViewCustom>
      <View style={styles.container}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome to . . .
        </Text>
        <Animated.View style={{ transform: [{ translateX: fadeAnim }] }}>
          <Text style={styles.span} variant="displaySmall">
            NextFly
          </Text>
        </Animated.View>
      </View>
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      borderWidth: 2,
    },
    title: {
      color: theme.colors.text,
      fontFamily: "Montserrat-Bold",
      paddingBottom: 10,
    },
    span: {
      color: theme.colors.secondary,
      letterSpacing: 2,
      fontFamily: "Montserrat-ExtraBold",
      textShadowColor: "#000",
      textShadowOffset: { width: 5, height: 2 },
      textShadowRadius: 1,
    },
  });
