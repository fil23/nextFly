import React, { FC } from "react";
import Carousel from "pinar";
import { PreferCard } from "./preferiti_card";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

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
interface MyProps {
  data: Data[];
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
