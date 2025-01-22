import React from "react";
import { Image, StyleSheet, View } from "react-native";
export const Logo_header = () => {
  return (
    <View>
      <Image
        source={require("../../assets/adaptive-icon.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    paddingVertical: 15,
    width: 50,
    height: 50,
  },
});
