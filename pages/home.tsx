import { SafeAreaView } from "react-native";
import { Button, Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaViewCustom } from "../components/safeAreaViewCustom";

export const Home = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaViewCustom>
      <Text>Home</Text>
      <Button onPress={() => navigate.navigate("Details")}>Vai dettagli</Button>
    </SafeAreaViewCustom>
  );
};

export default Home;
