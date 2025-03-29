import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Text } from "react-native-paper";
import type { Travel } from "../../../constants/interfaces/travel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchTypeList } from "./searchTypeList";

type TravelProps = NativeStackScreenProps<SearchTypeList, "information">;
export const InformationPage = ({ route, navigation }: TravelProps) => {
  //theme info
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

  //travel's informations
  const [info, setInfo] = useState<Travel>();
  const destination = route.params.destination;

  return (
    <SafeAreaViewCustom>
      <View>
        <Text>{destination}</Text>
      </View>
    </SafeAreaViewCustom>
  );
};
