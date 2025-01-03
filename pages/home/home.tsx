import { Button, Card, Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { StyleSheet, useColorScheme, View } from "react-native";
import Carousel from "pinar";

export const Home = () => {
  const navigation = useNavigation();
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const data = [{ title: "Viaggio1" }, { title: "Viaggio2" }];
  return (
    <SafeAreaViewCustom>
      <Carousel
        showsControls={false}
        height={300}
        dotStyle={{ backgroundColor: "black" }}
        activeDotStyle={{ backgroundColor: "white" }}
      >
        {data.map((viaggio, index) => (
          <Card style={styles.card} key={index}>
            <Card.Title title={viaggio.title} />
            <Card.Cover
              source={{
                uri: "https://i.pinimg.com/736x/35/4f/6a/354f6ab197de51bb1bcc7cd9aae0639d.jpg",
              }}
              resizeMode="cover"
              style={{ borderRadius: 0 }}
            />
          </Card>
        ))}
      </Carousel>
    </SafeAreaViewCustom>
  );
};

export default Home;

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    card: {
      borderRadius: 0,
      backgroundColor: theme.colors.surface,
    },
  });
