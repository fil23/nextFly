import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

export const FormSignIn = () => {
  const [utente, setUtente] = useState<Utente | null>(null);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={utente?.email}
        label="email"
        placeholder="Insert your email..."
        style={styles.input}
        activeOutlineColor={theme.colors.secondary}
        right={<TextInput.Icon icon="emoticon-sad-outline" />}
      />
      <TextInput
        mode="outlined"
        value={utente?.password}
        label="password"
        placeholder="Insert your password..."
        style={styles.input}
        activeOutlineColor={theme.colors.secondary}
        right={<TextInput.Icon icon="emoticon-sad-outline" />}
      />

      <Button
        mode="elevated"
        textColor={theme.colors.text}
        contentStyle={{ backgroundColor: theme.colors.surface }}
        style={styles.button}
      >
        Sign in
      </Button>
    </View>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    input: {},
    container: {
      marginTop: 20,
      width: "100%",
      paddingHorizontal: "10%",
      paddingTop: 50,
      justifyContent: "flex-start",
      flex: 2,
      gap: 10,
    },

    button: {
      marginTop: 15,
    },
  });
