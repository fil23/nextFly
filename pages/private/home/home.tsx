import {
  Avatar,
  Button,
  Card,
  Icon,
  Searchbar,
  Text,
} from "react-native-paper";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
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
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [search, setSearch] = useState<string>("");
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
  ]);
  // provisional data

  const handleData = useCallback(
    (datan: Data) => {
      setData((prev) => ({ ...prev, datan }));
    },
    [data]
  );
  return (
    <SafeAreaView style={styles.safe_area}>
      <ScrollView
        contentInsetAdjustmentBehavior="always"
        automaticallyAdjustsScrollIndicatorInsets
        showsVerticalScrollIndicator={false}
      >
        {/* TODO:ADD CAROSELLO? */}
        {/* Cover  */}
        <View style={styles.cover_container}>
          <ImageBackground
            source={require("../../../assets/img/Toky nights2.jpg")}
            style={styles.cover_image}
            imageStyle={styles.cover_img}
            resizeMode="cover"
            resizeMethod="resize"
          />
          <View style={styles.cover_container_content}>
            <Text style={styles.title} variant="displaySmall">
              Find your place
            </Text>

            {/* search bar */}
            <Searchbar
              autoCapitalize="sentences"
              value={search}
              theme={theme}
              placeholder="Where is your palce?"
              elevation={5}
              inputStyle={{
                color: theme.colors.text,
                fontSize: 16,
                alignSelf: "center",
                fontFamily: "Montserrat",
                fontWeight: 400,
              }}
              multiline={false}
              placeholderTextColor={theme.colors.placeholder}
              maxLength={25}
              onChangeText={(text) => setSearch(text)}
              clearButtonMode="always"
              collapsable={true}
              style={styles.searchbar}
            />
          </View>
        </View>
        <View style={styles.content_prefer}>
          {/* My travels */}
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
              gap: 10,
            }}
          >
            <Avatar.Icon
              size={50}
              icon="airplane-takeoff"
              style={{ backgroundColor: theme.colors.background }}
              color={theme.colors.secondary}
            />
            <Text style={styles.section} variant="titleLarge">
              My trips:
            </Text>
          </View>
          {/* Carousel of saved travels  */}
          <CustomCarousel data={data} />
          <Text style={styles.section}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sint
            possimus dolores voluptate eaque natus fugit provident soluta at
            placeat? Cum repellendus sint ut neque iure voluptatibus incidunt
            nam accusantium?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    // main areas
    safe_area: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    section: {
      marginVertical: 20,
      textShadowColor: "black",
      textShadowOffset: {
        width: 2,
        height: 2,
      },
      textShadowRadius: 1,
    },
    // cover area
    cover_container: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxHeight: 400,
      minHeight: 200,
    },
    cover_image: {
      width: "100%",
      height: "100%",
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    cover_img: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    cover_container_content: {
      position: "absolute",
      gap: 30,
    },
    // content areas
    content_prefer: {
      paddingHorizontal: 10,
      paddingBottom: 60,
    },

    title: {
      color: theme.colors.text,
      textShadowColor: theme.colors.shadow,
      textShadowOffset: {
        width: 2,
        height: 2,
      },
      textShadowRadius: 2,
    },

    searchbar: {
      backgroundColor: theme.colors.surface,
      minHeight: 40,
      maxHeight: 50,
    },
  });
