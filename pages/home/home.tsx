import { Avatar, Button, Card, Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import {
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Carousel from "pinar";
import { PreferCard } from "../../components/cards/preferiti_card";

export const Home = () => {
  const navigation = useNavigation();
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const data = [
    {
      title: "Fantastico viaggi NY",
      img: "https://i.pinimg.com/474x/50/23/73/502373bda51129d7aa91e4d56bbadcaa.jpg",
      localita: "New York",
      partecipanti: 3,
      aeroporto_arrivo: "JFK",
      aperto: true,
      data_arrivo: "22/10/2025",
    },
    {
      title: "Super Tokyo",
      img: "https://i.pinimg.com/474x/a8/a7/79/a8a77990462bcf699372f8ba9f962056.jpg",
      localita: "Tokyo",
      partecipanti: 50,
      aeroporto_arrivo: "Aeroporto Internazionale Tokyo",
      aperto: false,
      data_arrivo: "23/04/2025",
    },
  ];
  return (
    <SafeAreaViewCustom>
      <Text style={styles.section}>Preferiti:</Text>
      <Carousel showsControls={false} height={230}>
        {data.map((viaggio, index) => (
          <PreferCard index={index} viaggio={viaggio} />
        ))}
      </Carousel>
    </SafeAreaViewCustom>
  );
};

export default Home;

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    section: {
      marginVertical: 20,
      fontSize: 18,
      fontFamily: "Montserrat-Bold",
    },
  });
