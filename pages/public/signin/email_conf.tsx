import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, TextInput } from "react-native-paper";
import { AuthListType } from "../params/AuthListType";
import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";

type EmailConfirmProps = NativeStackScreenProps<AuthListType, "email_conf">;
const NUMBER_CELL = 5;
export const EmailConfirm = ({ route }: EmailConfirmProps) => {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [code, setCode] = useState<string[]>(Array(NUMBER_CELL).fill(""));
  const { email, password } = route.params;
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.text_container}>
        <Text variant="displaySmall" style={styles.title}>
          Insert your code
        </Text>
      </View>
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
            Resend code with same mail
          </Text>
        </Button>
      </View>
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
      flex: 0.3,
      width: "100%",
      justifyContent: "center",
    },
    input_container: {
      flexDirection: "column",
      width: "90%",
      gap: 40,
      marginHorizontal: 10,
      justifyContent: "space-evenly",
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
