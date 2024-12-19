import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text> SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
