import React, { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { useNavigation } from "@react-navigation/native";

export const Login_Form = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [utente, setUtente] = useState<Utente | null>();
  const navigate = useNavigation();
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

      <View style={styles.link}>
        <Button onPress={() => navigate.navigate("signin")} variant="plain">
          Sign-in
        </Button>

        <Button
          onPressIn={() => navigate.navigate("find_pass")}
          variant="plain"
        >
          I forgot my password
        </Button>
      </View>

      <Button mode="elevated">Login</Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
  },
  link: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});
