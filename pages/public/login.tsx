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

  const styles = createStyle(theme);
  return (
    <SafeAreaViewCustom>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.title}>
          Welcome
        </Text>

        <Login_Form />
      </View>
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
      textAlignVertical: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: theme.colors.text,
    },
  });
