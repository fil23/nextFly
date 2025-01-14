import React, { FC, useEffect, useState } from "react";
import { StyleSheet, ToastAndroid, useColorScheme, View } from "react-native";
import { Button, Icon, Text, TextInput } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { useAuth } from "../../configurations/contexts/authContext";
import Toast from "react-native-toast-message";
import { chiamata_publ_post_async } from "../../api/calls/chiamate";
import { endpoints } from "../../api/endpoints/endpoints";
import { useNavigation } from "@react-navigation/native";

interface InputText {
  email: string;
  password: string;
}

interface Errors {
  error: boolean;
  msg_error: string;
}

interface MyProps {
  load: boolean;
  setLoad: any;
}
export const FormSignIn: FC<MyProps> = (props): JSX.Element => {
  const [utente, setUtente] = useState<Utente | null>(null);
  const [hide, setHide] = useState<boolean>(true);
  const [inputs, setInputs] = useState<InputText>({ email: "", password: "" });
  const [error, setError] = useState<Errors>({ error: false, msg_error: "" });
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const navigation = useNavigation();

  const { signInWithGoogle, handleUtente } = useAuth();

  const validateEmail = (email: string): boolean => {
    const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regEmail.test(email);
  };

  const handlerInputs = (text: string, inputName: string) => {
    setInputs((prev) => ({ ...prev, [inputName]: text }));
  };

  const signIn = () => {
    props.setLoad(true);
    if (validateEmail(inputs.email)) {
      chiamata_publ_post_async(endpoints.auth.verifica_email_reg, inputs)
        .then((risp) => {
          Toast.show({
            type: "success",
            text1: "Email sent",
            text2: "Check your emails and write the code!",
          });
          navigation.navigate("email_conf", {
            email: inputs.email,
            password: inputs.password,
          });
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Something has gone wrong",
            text2: "Sorry something went wrong can you try again later? ",
          });
        })
        .finally(() => {
          props.setLoad(false);
        });
    } else {
      setError(() => ({ error: true, msg_error: "Format email error" }));
      Toast.show({
        type: "error",
        text1: "Format error",
        text2: "can you check your email please?",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        error={error.error}
        value={utente?.email}
        maxLength={50}
        multiline={false}
        label="Email"
        placeholder="Insert your email..."
        contentStyle={styles.input}
        activeOutlineColor={theme.colors.secondary}
        right={<TextInput.Icon icon="emoticon-sad-outline" />}
        onChangeText={(text) => handlerInputs(text, "email")}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <TextInput
        mode="outlined"
        value={utente?.password}
        autoCapitalize="none"
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
        onChangeText={(text) => handlerInputs(text, "password")}
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
        onPress={signIn}
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
