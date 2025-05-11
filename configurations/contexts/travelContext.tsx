import { createContext, ReactNode, useContext, useState } from "react";
import { Travel, TravelSupa } from "../../constants/interfaces/travel";

interface TravelContextType {
  info: Travel;
  setInfo: (travel: Travel) => void;
  handleInfos: (
    name: "destination" | "n_passengers" | "start_date" | "end_date" | "badget",
    value: Date | string | number
  ) => void;
  infoSupa: TravelSupa;
  setInfoSupa: (travel: TravelSupa) => void;
  handleInfoSupaFromInfos: (travel: Travel) => void;
  handlerInfoSupa: (
    name:
      | "user_created"
      | "id_continent"
      | "travel_generated"
      | "profile_image"
      | "destination"
      | "n_travelers"
      | "arrive_date"
      | "departure_date"
      | "badget",
    value: Date | string | number
  ) => void;
}

const TravelContext = createContext<TravelContextType | null>(null);

export const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Travel>({
    destination: "",
    start_date: new Date(),
    end_date: new Date(),
    badget: null,
    n_passengers: 0,
  });
  const [infoSupa, setInfoSupa] = useState<TravelSupa>({
    destination: null,
    arrive_date: null,
    departure_date: null,
    n_travelers: null,
    badget: null,
    user_created: null,
    id_continent: null,
    travel_generated: null,
    profile_image: null,
  });

  const handleInfos = (
    name: "destination" | "n_passengers" | "start_date" | "end_date" | "badget",
    value: Date | string | number
  ) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleInfoSupaFromInfos = (travel: Travel) => {
    setInfoSupa({
      destination: travel.destination,
      arrive_date: travel.start_date,
      departure_date: travel.end_date,
      n_travelers: travel.n_passengers,
      badget: Number(travel.badget),
      user_created: null,
      id_continent: null,
      travel_generated: null,
      profile_image: null,
    });
  };

  const handlerInfoSupa = (
    name:
      | "user_created"
      | "id_continent"
      | "travel_generated"
      | "profile_image"
      | "destination"
      | "n_travelers"
      | "arrive_date"
      | "departure_date"
      | "badget",
    value: Date | string | number
  ) => {
    setInfoSupa((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <TravelContext.Provider
      value={{
        info,
        setInfo,
        handleInfos,
        infoSupa,
        setInfoSupa,
        handleInfoSupaFromInfos,
        handlerInfoSupa,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error("useTravel must be used within an TravelProvider");
  }
  return context;
};
