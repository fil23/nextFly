import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";

export const Login = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [utente, setUtente] = useState<Utente | null>(null);
  return (
    <SafeAreaViewCustom>
      <View style={styles.container}>
        <Text
          variant="displayMedium"
          style={[styles.title, { color: theme.colors.text }]}
        >
          Welcome
        </Text>
        <TextInput
          label="email"
          mode="outlined"
          value={utente?.email}
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          placeholder="Insert your email..."
          textColor={theme.colors.text}
          cursorColor={theme.colors.text}
          activeUnderlineColor={theme.colors.accent}
          underlineColor={theme.colors.accent}
        />
      </View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlignVertical: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
  },
});
