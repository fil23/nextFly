import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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

// interfaces

type TravelProps = NativeStackScreenProps<SearchTypeList, "information">;

export const InformationPage = ({ route, navigation }: TravelProps) => {
  //theme info
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;

  //travel's informations
  const [info, setInfo] = useState<Travel>();
  const destination = route.params.destination;
  const [dateOpen, setDateOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const today = new Date();
  const styles = createStyle(theme);
  const onConfirm = useCallback(
    (output: RangeOutput) => {
      setDateOpen(false);
      setStartDate(output.startDateString ?? "");
      setEndDate(output.endDateString ?? "");
      console.log(startDate + " ->" + endDate);
    },
    [setDateOpen, startDate, endDate]
  );

  const onDismiss = React.useCallback(() => {
    setDateOpen(false);
  }, [setDateOpen]);

  return (
    <SafeAreaViewCustom>
      {/* First row with when input*/}

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
            onPress={() => setDateOpen(true)}
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
            onPress={() => setDateOpen(true)}
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
          <TextInput label="People" mode="outlined" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    main_container: {
      marginVertical: "20%",
      paddingHorizontal: "2%",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "10%",
    },
    input_date_start: {
      flex: 0.45,
    },

    input_dates: {
      width: "100%",

      maxHeight: 20,
      minHeight: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    second_row: {
      marginVertical: "10%",
    },
  });
