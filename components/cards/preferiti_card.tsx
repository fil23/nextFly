import React, { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "../../constants/theme/theme";
import { useNavigation } from "@react-navigation/native";
import { CustomChip } from "./custom_chip";

interface MyProps {
  index: number;
  viaggio: any;
}

export const PreferCard: FC<MyProps> = (props): JSX.Element => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const navigate = useNavigation();
  return (
    <Card
      style={styles.card}
      key={props.index}
      onPress={() => navigate.navigate("details", { viaggio: props.viaggio })}
    >
      <Card.Title title={props.viaggio.title} titleStyle={styles.card_title} />
      <Card.Content style={styles.card_content}>
        <View style={styles.card_image}>
          <ImageBackground
            source={{ uri: props.viaggio.img }}
            style={{ width: "100%", height: "100%" }}
            imageStyle={{ borderRadius: 20 }}
            resizeMode="cover"
            resizeMethod="resize"
          />
        </View>
        <View style={styles.card_info}>
          <Text style={styles.card_info_text}>
            <Text style={styles.card_info_text_label}>Destination:</Text>
            {" " + props.viaggio.localita}
          </Text>
          <Text style={styles.card_info_text}>
            <Text style={styles.card_info_text_label}>Participants:</Text>{" "}
            {props.viaggio.partecipanti}
          </Text>
          <Text style={styles.card_info_text}>
            <Text style={styles.card_info_text_label}>Arrival airport:</Text>{" "}
            {props.viaggio.aeroporto_arrivo}
          </Text>
          <Text style={styles.card_info_text}>
            <Text style={styles.card_info_text_label}>Arrival date:</Text>{" "}
            {props.viaggio.data_arrivo}
          </Text>
          <View style={{ flexDirection: "row", width: "70%", gap: 5 }}>
            <Text style={[styles.card_info_text, styles.card_info_text_label]}>
              State:
            </Text>
            <CustomChip testo={props.viaggio.aperto ? "open" : "close"} />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
    },
    card_title: {
      fontFamily: "Montserrat-ExtraBold",
      textAlign: "center",
    },
    card_image: {
      width: "35%",
    },
    card_content: {
      height: "77%",
      marginTop: -10,
      flexDirection: "row",
      gap: 15,
    },
    card_info: {
      flex: 1,
      flexDirection: "column",
      paddingTop: 4,
      gap: 3,
    },
    card_info_text: {
      color: theme.colors.text,
      fontFamily: "Montserrat-Regular",
      fontSize: 12,
    },
    card_info_text_label: { fontFamily: "Montserrat-Bold" },
  });
