import { Button, Divider, IconButton, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeListType } from "./paramHomeList";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { useState } from "react";
import { CustomChip } from "../../../components/cards/custom_chip";
import { CustomButtonYellow } from "../../../components/buttons/CustomButtonYellow";

type DetailsProps = NativeStackScreenProps<HomeListType, "details">;

export const Details = ({ route, navigation }: DetailsProps) => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const [preferito, setPreferito] = useState<boolean>(true);
  const { viaggio } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        automaticallyAdjustsScrollIndicatorInsets
      >
        {/* Cover image */}
        <View style={styles.cover}>
          <ImageBackground
            source={{ uri: viaggio.img }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          <IconButton
            icon={preferito ? "star" : "star-outline"}
            style={styles.star_button}
            iconColor={theme.colors.yellow_star}
            size={30}
            onPress={() => setPreferito(!preferito)}
          />
          <View style={styles.cover_title}>
            <Text
              variant="displayMedium"
              style={{
                color: theme.colors.secondary,
                textAlign: "center",
              }}
            >
              {viaggio.destinazione}
            </Text>
          </View>
        </View>

        {/* Travel's information */}
        <View style={styles.info}>
          <View style={{ gap: 10 }}>
            <Text variant="titleMedium">Information:</Text>
            <Text>Destination: {viaggio.destinazione}</Text>
            <Text>Partecipants number: {viaggio.partecipanti}</Text>
            <View style={{ flexDirection: "row", width: "50%", gap: 5 }}>
              <Text>State:</Text>
              <CustomChip testo={viaggio.aperto ? "open" : "close"} />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                alignItems: "center",
              }}
            >
              <Text>Creator: </Text>
              <Button
                mode="text"
                compact
                onPress={() =>
                  navigation.push("profile", { utente: viaggio.creatore })
                }
              >
                <Text
                  style={{ color: theme.colors.link }}
                  variant="labelMedium"
                >
                  {viaggio.creatore}
                </Text>
              </Button>
            </View>

            <Divider style={{ marginVertical: 10 }} />
          </View>

          {/* Travel's details */}
          <View>
            <Text variant="titleMedium">Descrizione:</Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              obcaecati iure praesentium reiciendis sed, unde veniam illum rerum
              incidunt voluptates quia quam quod magni soluta beatae,
              dignissimos expedita officiis deserunt?
            </Text>
          </View>
        </View>

        <CustomButtonYellow
          text="submit"
          function={() => {}}
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    cover: {
      width: "100%",
      maxHeight: 350,
      minHeight: 200,
    },
    cover_title: {
      position: "absolute",
      width: "100%",
      top: "50%",
    },
    star_button: {
      position: "absolute",
      top: 0,
      right: 5,
    },
    container: {
      flex: 1,
      paddingBottom: 20,
    },
    info: {
      paddingHorizontal: 10,
      marginTop: 10,
    },

    scroll: {
      backgroundColor: theme.colors.background,
    },

    button: {
      width: "auto",
      marginHorizontal: 60,
      marginTop: 30,
    },
  });
