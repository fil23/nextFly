import { createContext, ReactNode, useContext, useState } from "react";
import {
  Travel,
  TravelsGenerated,
  TravelSupa,
} from "../../constants/interfaces/travel";

interface TravelContextType {
  infoSupa: TravelSupa;
  setInfoSupa: (travel: TravelSupa) => void;
  handlerInfoSupa: (
    name:
      | "user_id"
      | "id_continent"
      | "id_travel_generated"
      | "profile_image"
      | "destination"
      | "n_travelers"
      | "arrive_date"
      | "departure_date"
      | "badget",
    value: Date | string | number | null
  ) => void;
  travelGenerated: TravelsGenerated;
  setTravelGenerated: (travel: TravelsGenerated) => void;
}

const TravelContext = createContext<TravelContextType | null>(null);

export const TravelProvider = ({ children }: { children: ReactNode }) => {
 
  const [infoSupa, setInfoSupa] = useState<TravelSupa>({
    destination: null,
    arrive_date: null,
    departure_date: null,
    n_travelers: null,
    badget: null,
    user_id: null,
    id_continent: null,
    id_travel_generated: null,
    profile_image: null,
  });

  const handlerInfoSupa = (
    name:
      | "user_id"
      | "id_continent"
      | "id_travel_generated"
      | "profile_image"
      | "destination"
      | "n_travelers"
      | "arrive_date"
      | "departure_date"
      | "badget",
    value: Date | string | number | null
  ) => {
    setInfoSupa((prev) => ({ ...prev, [name]: value }));
  };

  const [travelGenerated, setTravelGenerated] =
    useState<TravelsGenerated>({
      user_id:null,
      created_at:new Date(),
      travel:null
    });

  return (
    <TravelContext.Provider
      value={{
        infoSupa,
        setInfoSupa,
        handlerInfoSupa,
        travelGenerated,
        setTravelGenerated
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
