import React, { useCallback, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { Button, Text, TextInput } from "react-native-paper";
import type { Travel } from "../../../constants/interfaces/travel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchTypeList } from "./searchTypeList";
import DatePicker, { RangeOutput } from "react-native-neat-date-picker";
import { create } from "domain";
import { CustomButtonYellow } from "../../../components/buttons/CustomButtonYellow";
import { GoogleGenAI, Type } from "@google/genai";
import { useAuth } from "../../../configurations/contexts/authContext";

// interfaces

type TravelProps = NativeStackScreenProps<SearchTypeList, "information">;

export const InformationPage = ({ route, navigation }: TravelProps) => {
  //theme info
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

  //travel's informations
  const [info, setInfo] = useState<Travel>({
    destination: "",
    start_date: new Date(),
    end_date: new Date(),
    badget: null,
    n_passengers: 0,
  });
  const destination = route.params.destination;
  const [dateOpen, setDateOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [focus, setFocus] = useState<boolean>(false);
  const [passanger, setPassanger] = useState<number>(1);
  const [badget, setBadget] = useState<string>("0");
  const [response, setResponse] = useState<string>("");
  const today = new Date();
  const styles = createStyle(theme);
  const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_API_KEY_GEMINI,
  });
  const { onLoad, setOnLoad } = useAuth();

  const onConfirm = useCallback(
    (output: RangeOutput) => {
      setDateOpen(false);
      setStartDate(output.startDateString ?? "");
      setEndDate(output.endDateString ?? "");
      handleInfos("destination", destination);
      handleInfos("start_date", new Date(startDate ?? today));
      handleInfos("end_date", new Date(endDate ?? today));
      console.log(info.start_date.getDate());
    },
    [setDateOpen, startDate, endDate]
  );

  const onDismiss = React.useCallback(() => {
    setDateOpen(false);
  }, [setDateOpen]);

  const handleInfos = (
    name: "destination" | "n_passengers" | "start_date" | "end_date" | "badget",
    value: Date | string | number
  ) => {
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const confirm = useCallback(() => {
    handleInfos("destination", destination);
    handleInfos("start_date", new Date(startDate ?? today));
    handleInfos("end_date", new Date(endDate ?? today));
    handleInfos("n_passengers", passanger);
    handleInfos("badget", badget);
  }, [destination, startDate, endDate, passanger, badget]);

  const generate = async () => {
    console.log("entrato");
    setOnLoad(true);
    const prompt =
      "Generate a travel in " +
      info.destination +
      " for " +
      info.n_passengers +
      " people with " +
      info.badget +
      "€ badget from " +
      info.start_date +
      " to " +
      info.end_date;

    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: {
                  type: Type.NUMBER,
                  description: "Number of the day",
                  nullable: false,
                },
                location: {
                  type: Type.STRING,
                  description: "Name of the location",
                  nullable: false,
                },
                duration: {
                  type: Type.NUMBER,
                  description: "Days in the current location",
                  nullable: false,
                },
                places: {
                  type: Type.ARRAY,
                  description: "Places to visit in this location",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      place: {
                        type: Type.STRING,
                        description: "Name of the place to visit",
                        nullable: false,
                      },
                      price: {
                        type: Type.NUMBER,
                        description: "Price to visit the place",
                      },
                    },
                  },
                },
                price: {
                  type: Type.NUMBER,
                  description: "The cost in the current location",
                  nullable: false,
                },
              },
            },
          },
        },
      });
      console.log(res.text);
    } catch (exeption) {
      console.error(exeption);
    } finally {
      setOnLoad(false);
    }
  };

  return (
    <SafeAreaViewCustom>
      {/* First row with when input*/}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={styles.main_container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <Text variant="headlineSmall">How long will you stay? </Text>
            <View style={styles.input_dates}>
              <TextInput
                mode="outlined"
                value={startDate}
                placeholder="Start date"
                style={styles.input_date_start}
                left={
                  <TextInput.Icon
                    icon="airplane-takeoff"
                    color={theme.colors.secondary}
                  />
                }
                readOnly
                onPressIn={Keyboard.dismiss}
                onPressOut={() => {
                  setDateOpen(true);
                }}
                outlineColor={theme.colors.secondary}
              />

              <TextInput
                mode="outlined"
                value={endDate}
                placeholder="End date"
                style={styles.input_date_start}
                left={
                  <TextInput.Icon
                    icon="airplane-landing"
                    color={theme.colors.secondary}
                  />
                }
                outlineColor={theme.colors.secondary}
                onPressIn={Keyboard.dismiss}
                onPressOut={() => {
                  setDateOpen(true);
                }}
                readOnly
              />
            </View>

            <DatePicker
              isVisible={dateOpen}
              mode="range"
              onConfirm={onConfirm}
              onCancel={onDismiss}
              minDate={today}
              colorOptions={{
                backgroundColor: theme.colors.surface,
                headerColor: theme.colors.surface,
                confirmButtonColor: theme.colors.secondary,
                dateTextColor: theme.colors.text,
                selectedDateBackgroundColor: theme.colors.secondary,
                headerTextColor: theme.colors.secondary,
                weekDaysColor: theme.colors.secondary,
              }}
              dateStringFormat="dd/mm/yyyy"
            />

            <View style={styles.second_row}>
              <Text variant="headlineSmall">How many people? </Text>
              <TextInput
                label="People"
                mode="outlined"
                activeOutlineColor={theme.colors.secondary}
                keyboardType="number-pad"
                maxLength={2}
                onFocus={() => setFocus(true)}
                onChangeText={(number: string) => setPassanger(Number(number))}
                onPressOut={() => {
                  setFocus(false);
                }}
                numberOfLines={1}
                placeholder="1"
              />
            </View>

            <View style={styles.third_row}>
              <Text variant="headlineSmall">Your badget?</Text>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                right={<TextInput.Icon icon="currency-eur" />}
                activeOutlineColor={theme.colors.secondary}
                placeholder="0"
                value={badget}
                onChangeText={(text) => setBadget(text)}
              />
            </View>
          </KeyboardAvoidingView>
          <CustomButtonYellow
            text="Confirm"
            function={generate}
            style={styles.confirm_button}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    main_container: {
      paddingHorizontal: "2%",
      flex: 0.7,
      justifyContent: "space-around",
      alignItems: "center",
    },
    input_date_start: {
      flex: 0.45,
    },

    input_dates: {
      width: "100%",
      maxHeight: "10%",
      minHeight: "5%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    second_row: {
      maxHeight: "10%",
      minHeight: "7%",
      gap: 10,
    },

    input_people: {
      height: 7,
    },

    third_row: {
      maxHeight: "10%",
      minHeight: "7%",
      gap: "50%",
      marginBottom: "10%",
      marginTop: "5%",
    },

    confirm_button: {
      marginHorizontal: "10%",
      marginTop: "10%",
    },
  });
