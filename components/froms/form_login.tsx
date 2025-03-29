import React, { FC, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../configurations/contexts/authContext";

interface MyProps {
  load: boolean;
  setOnLoad: any;
}

interface Error {
  error: string;
  msg: string;
}

interface Inputs {
  email: string;
  password: string;
}

export const Login_Form: FC<MyProps> = (props): JSX.Element => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  const [inputs, setInputs] = useState<Inputs>({ email: "", password: "" });
  const [hide, setHide] = useState<boolean>(true);
  const [error, setError] = useState<Error>({ error: "", msg: "" });
  const navigate = useNavigation();
  const styles = createStyle(theme);
  const { signIn } = useAuth();

  const login = () => {
    signIn(inputs.email, inputs.password);
  };

  return (
    <>
      <TextInput
        label="Email"
        mode="outlined"
        placeholderTextColor={theme.colors.placeholder}
        value={inputs.email}
        onChangeText={(text) => setInputs((prev) => ({ ...prev, email: text }))}
        style={{ width: "80%" }}
        placeholder="Insert your email..."
        inputMode="email"
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
        textColor={theme.colors.text}
        contentStyle={styles.input}
        activeOutlineColor={theme.colors.borderColor}
        maxLength={50}
        multiline={false}
        error={error.error == "email" ? true : false}
      />

      <TextInput
        label="Password"
        mode="outlined"
        placeholderTextColor={theme.colors.placeholder}
        passwordRules={
          "required: upper; required: lower; required: digit; minlength: 8;"
        }
        value={inputs?.password}
        onChangeText={(text) =>
          setInputs((prev) => ({ ...prev, password: text }))
        }
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
        error={error.error == "password" ? true : false}
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
        onPress={login}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.secondary_text }}
        >
          Login
        </Text>
      </Button>

      {/* <Button
        mode="elevated"
        buttonColor={theme.colors.google_button_color}
        icon={() => <Icon source="google" size={20} />}
        style={styles.button}
        onPress={signInWithGoogle}
      >
        <Text variant="titleSmall">Accedi con Google</Text>
      </Button> */}
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
