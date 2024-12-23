import React, { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { useNavigation } from "@react-navigation/native";

export const Login_Form = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [utente, setUtente] = useState<Utente | null>();
  const navigate = useNavigation();
  const styles = createStyle(theme);
  return (
    <>
      <TextInput
        label="email"
        mode="outlined"
        placeholderTextColor={theme.colors.placeholder}
        value={utente?.email}
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
        placeholder="Insert your email..."
        textColor={theme.colors.text}
        activeOutlineColor={theme.colors.borderColor}
      />

      <TextInput
        label="password"
        mode="outlined"
        placeholderTextColor={theme.colors.placeholder}
        value={utente?.password}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}
        placeholder="Insert password..."
        textColor={theme.colors.text}
        activeOutlineColor={theme.colors.borderColor}
      />

      <View style={styles.links}>
        <Button onPress={() => navigate.navigate("signin")} variant="plain">
          <Text style={styles.link}>Sign-in</Text>
        </Button>

        <Button
          onPressIn={() => navigate.navigate("find_pass")}
          variant="plain"
        >
          <Text style={styles.link}>I forgot my password</Text>
        </Button>
      </View>

      <Button
        mode="elevated"
        textColor={theme.colors.text}
        buttonColor={theme.colors.surface}
        style={styles.button}
      >
        Login
      </Button>
    </>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    input: {
      width: "80%",
    },
    links: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%",
    },
    link: {
      textDecorationLine: "underline",
      fontWeight: "bold",
      color: theme.colors.link,
    },
    button: {
      width: "70%",
    },
  });
