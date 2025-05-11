import { createContext, ReactNode, useContext, useState } from "react";
import { Travel } from "../../constants/interfaces/travel";

interface TravelContextType {
  info: Travel;
  setInfo: (travel: Travel) => void;
  handleInfos: (
    name: "destination" | "n_passengers" | "start_date" | "end_date" | "badget",
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

  const handleInfos = (
    name: "destination" | "n_passengers" | "start_date" | "end_date" | "badget",
    value: Date | string | number
  ) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <TravelContext.Provider
      value={{
        info,
        setInfo,
        handleInfos,
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
