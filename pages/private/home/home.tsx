import { Card, Searchbar, Text } from "react-native-paper";
import React, { useCallback, useState } from "react";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { CustomCarousel } from "../../../components/cards/carousel";
import { SectionTitleIcon } from "../../../components/titles/sectionTitlesWithIcon";

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

interface Cards {
  id: number;
  title: string;
  img: string;
}
export const Home = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [search, setSearch] = useState<string>("");

  //exemples of datas
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

  const [cards, setCards] = useState<Cards[]>([
    {
      id: 0,
      title: "Tokyo",
      img: "https://i.pinimg.com/474x/a8/a7/79/a8a77990462bcf699372f8ba9f962056.jpg",
    },
    {
      id: 1,
      title: "New York",
      img: "https://i.pinimg.com/474x/50/23/73/502373bda51129d7aa91e4d56bbadcaa.jpg",
    },
    {
      id: 0,
      title: "Tokyo",
      img: "https://i.pinimg.com/474x/a8/a7/79/a8a77990462bcf699372f8ba9f962056.jpg",
    },
    {
      id: 1,
      title: "New York",
      img: "https://i.pinimg.com/474x/50/23/73/502373bda51129d7aa91e4d56bbadcaa.jpg",
    },
    {
      id: 0,
      title: "Tokyo",
      img: "https://i.pinimg.com/474x/a8/a7/79/a8a77990462bcf699372f8ba9f962056.jpg",
    },
    {
      id: 1,
      title: "New York",
      img: "https://i.pinimg.com/474x/50/23/73/502373bda51129d7aa91e4d56bbadcaa.jpg",
    },
  ]);

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
              placeholder="Where is your place?"
              elevation={5}
              inputStyle={styles.search_bar_input}
              iconColor={theme.colors.secondary}
              cursorColor={theme.colors.secondary}
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
        {/* Different sections */}
        <View style={styles.content_prefer}>
          {/* My travels*/}
          <View>
            <SectionTitleIcon icon="airplane-takeoff" msg="My places" />
            {/* Carousel of saved travels  */}
            <CustomCarousel data={data} />
          </View>

          {/* Find new one */}
          <View>
            <SectionTitleIcon
              icon="airplane-landing"
              msg="Discover a new place"
            />
            {/* Cards of new countries */}
            {/* TODO:Sistemare la visualizzazione delle cardss */}
            {/* <FlatList
              data={cards}
              renderItem={({ item }) => (
                <Card.Cover source={{ uri: item.img }} />
              )}
            /> */}
          </View>
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
    },
    cover_img: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },

    cover_container_content: {
      position: "absolute",
      gap: 30,
    },

    search_bar_input: {
      color: theme.colors.text,
      fontSize: 16,
      alignSelf: "center",
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
    // content areas
    content_prefer: {
      paddingHorizontal: 10,
      paddingBottom: 60,
    },

    title: {
      color: theme.colors.title,
      textShadowColor: theme.colors.shadow,
      textShadowOffset: {
        width: 1,
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
