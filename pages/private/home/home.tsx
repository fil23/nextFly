import { Avatar, Button, Card, Text } from "react-native-paper";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { StyleSheet, useColorScheme, View } from "react-native";
import Carousel from "pinar";
import { PreferCard } from "../../../components/cards/preferiti_card";
import { CustomCarousel } from "../../../components/cards/carousel";

interface Data {
  title: string;
  img: string;
  destinazione: string;
  partecipanti: number;
  aeroporto_arrivo: string;
  aperto: boolean;
  data_arrivo: string;
  creatore: string;
}
export const Home = () => {
  const navigation = useNavigation();
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [data, setData] = useState<Data[]>([
    {
      title: "Fantastico viaggi NY",
      img: "https://i.pinimg.com/474x/50/23/73/502373bda51129d7aa91e4d56bbadcaa.jpg",
      destinazione: "New York",
      partecipanti: 3,
      aeroporto_arrivo: "JFK",
      aperto: true,
      data_arrivo: "22/10/2025",
      creatore: "franco@123",
    },
    {
      title: "Super Tokyo",
      img: "https://i.pinimg.com/474x/a8/a7/79/a8a77990462bcf699372f8ba9f962056.jpg",
      destinazione: "Tokyo",
      partecipanti: 50,
      aeroporto_arrivo: "Aeroporto Internazionale Tokyo",
      aperto: false,
      data_arrivo: "23/04/2025",
      creatore: "gianni@pippo",
    },
  ]);
  // provisional data

  const handleData = useCallback(
    (datan: Data) => {
      setData((prev) => ({ ...prev, datan }));
    },
    [data]
  );
  return (
    <SafeAreaViewCustom>
      <Text style={styles.section} variant="titleLarge">
        Preferiti:
      </Text>
      {/* Carousel of saved travels  */}
      <CustomCarousel data={data} />
    </SafeAreaViewCustom>
  );
};

export default Home;

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    section: {
      marginVertical: 20,
    },
  });
