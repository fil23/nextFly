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
import { type Travel } from "../../../constants/interfaces/travel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SearchTypeList } from "./searchTypeList";
import DatePicker, { RangeOutput } from "react-native-neat-date-picker";
import { CustomButtonYellow } from "../../../components/buttons/CustomButtonYellow";
import { GoogleGenAI, Type } from "@google/genai";
import { useTravel } from "../../../configurations/contexts/travelContext";
import { useNavigation } from "@react-navigation/native";
import { SplashScreen } from "../../splash/splashScreen";
import { supabase } from "../../../configurations/supabase_config";
import { setContinentId } from "../../../utils/continents";
import { useAuth } from "../../../configurations/contexts/authContext";

// interfaces

type TravelProps = NativeStackScreenProps<SearchTypeList, "information">;

export const InformationPage = ({ route, navigation }: TravelProps) => {
  //theme info
  const color = useColorScheme();
  const { session } = useAuth();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const {
    handlerInfoSupa,
    setTravelGenerated,
    travelGenerated,
    infoSupa
  } = useTravel();
  const navigate = useNavigation();
  //travel's informations
  const [infos, setInfos] = useState<Travel>({
    destination: route.params.destination,
    start_date: new Date(),
    end_date: new Date(),
    badget: null,
    n_passengers: 0,
  });

  const [dateOpen, setDateOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const today = new Date();
  const styles = createStyle(theme);
  const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_API_KEY_GEMINI,
  });
  const [onLoad, setOnLoad] = useState<boolean>(false);

  // Choose date
  const onConfirm = useCallback(
    (output: RangeOutput) => {
      setDateOpen(false);
      handleInfos("start_date", output.startDate ?? new Date());
      handleInfos("end_date", output.endDate ?? new Date());
      console.log(infos.start_date.getDate());
    },
    [setDateOpen, infos.start_date, infos.end_date]
  );

  const onDismiss = React.useCallback(() => {
    setDateOpen(false);
  }, [setDateOpen]);

  const handleInfos = (
    name: "destination" | "n_passengers" | "start_date" | "end_date" | "badget",
    value: Date | string | number
  ) => {
    setInfos((prev) => ({ ...prev, [name]: value }));
  };

  // Generate travel with AI
  const generate = async () => {
    setOnLoad(true);
    const prompt =
      "Generate an itinerary to " +
      infos.destination +
      " for " +
      infos.n_passengers +
      " people with " +
      infos.badget +
      "€ badget from " +
      infos.start_date.toDateString() +
      " to " +
      infos.end_date.toDateString() +
      " with differents places to visit for each day";
    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              continent: {
                type: Type.STRING,
                description: "continent of the destination",
                nullable: false,
                enum: [
                  "Asia",
                  "Africa",
                  "Europe",
                  "America",
                  "Antartica",
                  "Oceania",
                  " Antarctica",
                ],
              },
              travel: {
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
                          placeDescription: {
                            type: Type.STRING,
                            description:
                              "A short description of what I'll see or what I'll do in this place",
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
          },
        },
      });
      console.log(res.text);

      // Controll if params are all upload
      if (
        res.text?.trim() != "" &&
        res.text != null &&
        res.text != undefined &&
        (session?.user.id != undefined || session?.user.id != null)
      ) {
        const risp_json = JSON.parse(res.text);
        // Upload travel's data
        handlerInfoSupa("destination",route.params.destination);
        handlerInfoSupa("n_travelers",infos.n_passengers);
        handlerInfoSupa("arrive_date",infos.start_date);
        handlerInfoSupa("departure_date",infos.end_date);
        handlerInfoSupa("badget",infos.badget);
        handlerInfoSupa("user_id", session.user.id);
        setTravelGenerated({
          travel: risp_json.travel,
          user_id: session.user.id,
          
        });
        handlerInfoSupa("id_continent", setContinentId(risp_json.continent));
      } else {
        throw new Error("Error during travel's generation");
      }

    } catch (error: any) {
      console.error(error);
    } finally {
      setOnLoad(false);
      navigate.navigate("travelGenerated");
    }
  };

  // async function saveTravel() {
  //   const { data, error } = await supabase.from("travels").insert();
  // }

  return (
    <SafeAreaViewCustom>
      {onLoad ? (
        <SplashScreen />
      ) : (
        <>
          {/* First row with when input*/}
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ flex: 1 }}>
              <KeyboardAvoidingView
                style={styles.main_container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <Text variant="headlineSmall">How long will you stay? </Text>
                <View style={styles.input_dates}>
                  <TextInput
                    mode="outlined"
                    value={infos.start_date.toString()}
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
                    value={infos.end_date.toString()}
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
                    onChangeText={(number: string) =>
                      handleInfos("n_passengers", number)
                    }
                    onPressOut={() => {
                      setFocus(false);
                    }}
                    numberOfLines={1}
                    value={infos.n_passengers.toString()}
                  />
                </View>

                <View style={styles.third_row}>
                  <Text variant="headlineSmall">Your badget?</Text>
                  <TextInput
                    mode="outlined"
                    keyboardType="numeric"
                    right={<TextInput.Icon icon="currency-eur" />}
                    activeOutlineColor={theme.colors.secondary}
                    onChangeText={(text) => handleInfos("badget", text)}
                    value={infos.badget?.toString()}
                  />
                </View>
              </KeyboardAvoidingView>
              <CustomButtonYellow
                text="Confirm"
                function={() => generate()}
                style={styles.confirm_button}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
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
