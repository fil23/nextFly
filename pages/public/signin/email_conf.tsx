import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthListType } from "../params/AuthListType";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { Platform } from "react-native";
import { chiamata_publ_post_async } from "../../../api/calls/chiamate";
import { endpoints } from "../../../api/endpoints/endpoints";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { LoaderIndicator } from "../../../components/loaderIndicator";
import { useAuth } from "../../../configurations/contexts/authContext";

type EmailConfirmProps = NativeStackScreenProps<AuthListType, "email_conf">;
const NUMBER_CELL = 5;
export const EmailConfirm = ({ route }: EmailConfirmProps) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [code, setCode] = useState<string[]>(Array(NUMBER_CELL).fill(""));
  const [load, setLoad] = useState<boolean>(false);
  const { email, password } = route.params;
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const { setToken } = useAuth();

  const modElemento = (indice: number, stringa: any) => {
    setCode((prev) => {
      const newArray = [...prev];
      newArray[indice] = stringa;
      if (stringa && indice < NUMBER_CELL - 1) {
        inputRefs.current[indice + 1]?.focus();
      }
      return newArray;
    });
  };

  const handleKeyPress = (e: any, index: number) => {
    // Gestisce il tasto "Backspace" per tornare al campo precedente
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const sendcode = () => {
    const data = {
      email: email,
      password: password,
      code: code.join(""),
    };
    setLoad(true);
    chiamata_publ_post_async(endpoints.auth.code_validation, data)
      .then(async (risp) => {
        console.log("Codice verificato con successo ");

        Toast.show({ type: "success", text1: "Evrything is good!" });
        await SecureStore.setItemAsync("token", risp.data.token);
        setToken(risp.data.token);
      })
      .catch((err) => {
        console.log("Errore" + code.join(""));
        Toast.show({
          type: "error",
          text1: "Wrong code",
          text2: "Insert wrong code!",
        });
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {load ? (
        <LoaderIndicator />
      ) : (
        <>
          <View style={styles.text_container}>
            <Text variant="displaySmall" style={styles.title}>
              Insert your code
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.input_container}>
              <View style={styles.inputs}>
                {code.map((item, index) => (
                  <TextInput
                    mode="flat"
                    key={index}
                    ref={(ref: any) => (inputRefs.current[index] = ref)}
                    value={code[index]}
                    onChangeText={(text) => modElemento(index, text)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    maxLength={1}
                    textAlign="center"
                    multiline={false}
                    style={styles.input}
                    underlineColor={theme.colors.backdrop}
                    activeUnderlineColor={theme.colors.secondary}
                  />
                ))}
              </View>

              <Button
                mode="elevated"
                buttonColor={theme.colors.secondary}
                style={styles.button}
                elevation={5}
                onPress={sendcode}
              >
                <Text
                  variant="titleMedium"
                  style={{ color: theme.colors.secondary_text }}
                >
                  Submit
                </Text>
              </Button>

              <Button mode="text" compact>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: theme.colors.link,
                    textDecorationLine: "underline",
                    fontWeight: "500",
                  }}
                >
                  Resend code with same email
                </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
    },
    text_container: {
      marginVertical: 30,
      width: "100%",
      justifyContent: "center",
    },
    input_container: {
      flexDirection: "column",
      marginTop: "30%",
      gap: 30,
      width: "90%",
      marginHorizontal: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    inputs: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    title: {
      color: theme.colors.text,
      textAlign: "center",
    },
    input: {
      width: 50,
      fontSize: 20,
      fontFamily: "bold",
      backgroundColor: theme.colors.surface,
    },
    button: {
      marginTop: 15,
      width: "50%",
    },
  });
