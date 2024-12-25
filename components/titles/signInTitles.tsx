import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, useColorScheme, View } from "react-native";
import { Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

export const SignInTitles = () => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyles(theme);
  useEffect(() => {
    // Avvia l'animazione al caricamento del componente
    Animated.timing(slideAnim, {
      toValue: 0, // Valore finale
      duration: 1000, // Durata in millisecondi
      useNativeDriver: true, // Usa il driver nativo per migliori performance
    }).start();
  }, [slideAnim]);
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title}>
        Welcome to . . .
      </Text>
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        <Text style={styles.span} variant="displaySmall">
          NextFly
        </Text>
      </Animated.View>
    </View>
  );
};

const createStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    title: {
      color: theme.colors.text,
      fontFamily: "Montserrat-Bold",
      paddingBottom: 10,
    },
    span: {
      color: theme.colors.secondary,
      letterSpacing: 2,
      fontFamily: "Montserrat-ExtraBold",
      textShadowColor: theme.colors.shadow,
      textShadowOffset: { width: 3, height: 1 },
      textShadowRadius: 1,
    },

    container: {
      alignItems: "center",
    },
  });
