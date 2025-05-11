import React, { FC } from "react";
import { Text } from "react-native-paper";

interface MyProps {
  error: string;
}
export const ErrorScreen: FC<MyProps> = (props): JSX.Element => {
  return (
    <>
      <Text>Errore di rete</Text>
    </>
  );
};
