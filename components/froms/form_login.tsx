import React, { useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button, TextInput, Text, IconButton, Icon } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../configurations/contexts/authContext";

export const Login_Form = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const [utente, setUtente] = useState<Utente | null>();
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigation();
  const styles = createStyle(theme);
  const { signInWithGoogle } = useAuth();
  return (
    <>
      <TextInput
        label="Email"
        mode="outlined"
        placeholderTextColor={theme.colors.placeholder}
        value={utente?.email}
        style={{ width: "80%" }}
        placeholder="Insert your email..."
        passwordRules={"required:@"}
        inputMode="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        textColor={theme.colors.text}
        contentStyle={styles.input}
        activeOutlineColor={theme.colors.borderColor}
        maxLength={50}
        multiline={false}
      />

      <TextInput
        label="Password"
        mode="outlined"
        placeholderTextColor={theme.colors.placeholder}
        passwordRules={
          "required: upper; required: lower; required: digit; minlength: 8;"
        }
        value={utente?.password}
        style={{ width: "80%" }}
        contentStyle={styles.input}
        placeholder="Insert password..."
        maxLength={50}
        multiline={false}
        textColor={theme.colors.text}
        activeOutlineColor={theme.colors.borderColor}
        secureTextEntry={hide}
        right={
          <TextInput.Icon
            icon={hide ? "eye-outline" : "eye-off-outline"}
            size={20}
            onPress={() => setHide(!hide)}
          />
        }
      />

      <View style={styles.links}>
        <Button onPress={() => navigate.navigate("signin")}>
          <Text style={styles.link}>Sign-in</Text>
        </Button>

        <Button onPressIn={() => navigate.navigate("find_pass")}>
          <Text style={styles.link}>I forgot my password</Text>
        </Button>
      </View>

      <Button
        mode="elevated"
        buttonColor={theme.colors.secondary}
        style={styles.button}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.secondary_text }}
        >
          Login
        </Text>
      </Button>

      <Button
        mode="elevated"
        buttonColor={theme.colors.google_button_color}
        icon={() => <Icon source="google" size={20} />}
        style={styles.button}
        onPress={signInWithGoogle}
      >
        <Text variant="titleSmall">Accedi con Google</Text>
      </Button>
    </>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    input: {
      color: theme.colors.text,
      fontFamily: "Montserrat",
      fontSize: 15,
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
