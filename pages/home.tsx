import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaViewCustom } from "../components/safeAreaViewCustom";

export const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaViewCustom>
      {/* <Text variant="titleLarge">Home</Text> */}
      <Button onPress={() => navigation.navigate("details")}>
        Vai dettagli
      </Button>
    </SafeAreaViewCustom>
  );
};

export default Home;
