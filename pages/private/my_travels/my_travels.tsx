import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SectionTitleIcon } from "../../../components/titles/sectionTitlesWithIcon";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { MytravelsCard } from "../../../components/cards/coverCards";
import { AnimatedFAB, List, Text } from "react-native-paper";
import ListAccordion from "react-native-paper/lib/typescript/components/List/ListAccordion";
import { useNavigation } from "@react-navigation/native";

interface Travel {
  id: number;
  title: string;
  img: string;
  subtitle: string;
}

const data = [
  {
    id: 0,
    title: "Europe",
    data: [
      {
        id: 0,
        title: "Ritorno al Vietnam!",
        img: "https://i.pinimg.com/736x/e8/7d/87/e87d8748b8fdd2615c24b306eeca7e78.jpg",
        subtitle: "We are coming back to Vietnam!!",
      },
      {
        id: 1,
        title: "Ritorno al Vietnam!",
        img: "https://i.pinimg.com/736x/e8/7d/87/e87d8748b8fdd2615c24b306eeca7e78.jpg",
        subtitle: "We are coming back to Vietnam!!",
      },
    ],
  },

  {
    id: 1,
    title: "Asia",
    data: [
      {
        id: 2,
        title: "Ritorno al Vietnam!",
        img: "https://i.pinimg.com/736x/e8/7d/87/e87d8748b8fdd2615c24b306eeca7e78.jpg",
        subtitle: "We are coming back to Vietnam!!",
      },
      {
        id: 3,
        title: "Ritorno al Vietnam!",
        img: "https://i.pinimg.com/736x/e8/7d/87/e87d8748b8fdd2615c24b306eeca7e78.jpg",
        subtitle: "We are coming back to Vietnam!dsfdfsd!",
      },
    ],
  },
  {
    id: 2,
    title: "Africa",
    data: [
      {
        id: 4,
        title: "Ritorno al Vietnam!",
        img: "https://i.pinimg.com/736x/e8/7d/87/e87d8748b8fdd2615c24b306eeca7e78.jpg",
        subtitle: "We are coming back to Vietnam!!",
      },
      {
        id: 5,
        title: "Ritorno al Vietnam!",
        img: "https://i.pinimg.com/736x/e8/7d/87/e87d8748b8fdd2615c24b306eeca7e78.jpg",
        subtitle: "We are coming back to Vietnam!!",
      },
    ],
  },
  {
    id: 3,
    title: "America",
    data: [],
  },
];
export const MyTravelsPage = () => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const navigate = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View>
        <SectionTitleIcon msg="My travels" icon="map-marker-radius-outline" />
      </View>

      {/* List of continents */}
      <List.AccordionGroup>
        {data.map((section) => {
          return (
            <List.Accordion
              title={section.title}
              titleStyle={{ fontFamily: "Montserrat-Bold", fontSize: 15 }}
              titleMaxFontSizeMultiplier={18}
              id={section.id}
              theme={theme}
              key={section.id}
            >
              <FlatList
                data={section.data}
                renderItem={({ item }) => <MytravelsCard data={item} />}
              />
            </List.Accordion>
          );
        })}
      </List.AccordionGroup>

      <AnimatedFAB
        icon={"plus"}
        label="Create new travel"
        onPress={() => navigate.navigate("creaTravel")}
        extended={false}
        animateFrom="right"
        iconMode="static"
        style={styles.add_button}
        color={theme.colors.black}
      />
    </SafeAreaView>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 50,
    },
    cards_container: {
      flex: 1,
    },
    add_button: {
      position: "absolute",
      bottom: 90,
      right: 16,
      borderRadius: 100,
      backgroundColor: theme.colors.secondary,
    },
  });
