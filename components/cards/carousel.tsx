import React, { FC, memo } from "react";
import Carousel from "pinar";
import { PreferCard } from "./preferiti_card";

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
  return (
    <Carousel showsControls={false} height={230}>
      {data.map((viaggio, index) => (
        <PreferCard index={index} viaggio={viaggio} />
      ))}
    </Carousel>
  );
};
