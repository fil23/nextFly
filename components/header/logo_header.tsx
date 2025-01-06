import React from "react";
import { Image, StyleSheet, View } from "react-native";
export const Logo_header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/adaptive-icon.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    paddingRight: "5%",
    zIndex: -1,
  },
  logo: {
    paddingVertical: 10,
    width: 50,
    height: 50,
  },
});
