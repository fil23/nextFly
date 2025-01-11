import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button, Icon, Text, TextInput } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useAuth } from "../../configurations/contexts/authContext";

export const FormSignIn = () => {
  const [utente, setUtente] = useState<Utente | null>(null);
  const [hide, setHide] = useState<boolean>(true);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const { signInWithGoogle } = useAuth();

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={utente?.email}
        maxLength={50}
        multiline={false}
        label="Email"
        placeholder="Insert your email..."
        contentStyle={styles.input}
        activeOutlineColor={theme.colors.secondary}
        right={<TextInput.Icon icon="emoticon-sad-outline" />}
      />
      <TextInput
        mode="outlined"
        value={utente?.password}
        label="Password"
        maxLength={50}
        multiline={false}
        secureTextEntry={hide}
        passwordRules={
          "required: upper; required: lower; required: digit; minlength: 8;"
        }
        placeholder="Insert your password..."
        contentStyle={styles.input}
        activeOutlineColor={theme.colors.secondary}
        right={
          <TextInput.Icon
            icon={hide ? "eye-outline" : "eye-off-outline"}
            onPress={() => setHide(!hide)}
          />
        }
      />

      <Button
        mode="elevated"
        buttonColor={theme.colors.secondary}
        style={styles.button}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.secondary_text }}
        >
          Sign in
        </Text>
      </Button>

      <Button
        mode="elevated"
        style={styles.button}
        onPress={signInWithGoogle}
        buttonColor={theme.colors.google_button_color}
        collapsable
        icon={() => <Icon source="google" size={20} />}
      >
        <Text variant="titleSmall">Registrati con Google</Text>
      </Button>
    </View>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    input: {
      fontFamily: "Montserrat",
      fontSize: 15,
      color: theme.colors.text,
    },
    container: {
      marginTop: 20,
      flex: 0.7,
      paddingHorizontal: "10%",
      paddingTop: 50,
      justifyContent: "flex-start",
      gap: 10,
    },

    button: {
      marginTop: 15,
    },
  });
