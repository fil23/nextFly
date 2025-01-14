import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import { AuthListType } from "../params/AuthListType";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";

type EmailConfirmProps = NativeStackScreenProps<AuthListType, "email_conf">;
export const EmailConfirm = ({ route }: EmailConfirmProps) => {
  const { email, password } = route.params;
  return (
    <SafeAreaViewCustom>
      <Text>Codice</Text>
    </SafeAreaViewCustom>
  );
};
