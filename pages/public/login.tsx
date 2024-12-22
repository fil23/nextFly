import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import { Login_Form } from "../../components/froms/form_login";

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

        <Login_Form />
      </View>
    </SafeAreaViewCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingVertical: "30%",
  },
  title: {
    textAlignVertical: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
