import React, { FC } from "react";
import Carousel from "pinar";
import { PreferCard } from "./preferiti_card";
import { FlatList, ScrollView, useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { CoverCards } from "./coverCards";

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

interface Card {
  title: string;
  img: string;
  id: number;
}
interface MyProps {
  data: Data[];
}

interface MyPropsMulti {
  data: Card[];
}

export const CustomCarousel: FC<MyProps> = ({ data }): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  return (
    <Carousel
      showsControls={false}
      height={230}
      activeDotStyle={{
        backgroundColor: theme.colors.secondary,
        width: 8,
        height: 8,
        borderRadius: 100,
      }}
    >
      {data.map((viaggio, index) => (
        <PreferCard index={index} key={index} viaggio={viaggio} />
      ))}
    </Carousel>
  );
};

export const CarouselMulti: FC<MyPropsMulti> = ({ data }): JSX.Element => {
  return (
    <ScrollView horizontal>
      {data.map((item) => (
        <View
          style={{ minWidth: 130, maxWidth: 200, paddingRight: 15 }}
          key={item.id}
        >
          <CoverCards img={item.img} city={item.title} />
        </View>
      ))}
    </ScrollView>
    // <FlatList
    //   data={data}
    //   horizontal={true}
    //   style={{ width: "100%", marginRight: 10 }}
    //   renderItem={({ item }) => (
    //     <View style={{ minWidth: 130, maxWidth: 200, paddingRight: 15 }}>
    //       <CoverCards img={item.img} city={item.title} key={item.id} />
    //     </View>
    //   )}
    // />
  );
};
