import { Button, Divider, Text } from "react-native-paper";
import { SafeAreaViewCustom } from "../../components/safeAreaViewCustom";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeListType } from "./paramHomeList";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { darkTheme, lightTheme } from "../../constants/theme/theme";

type DetailsProps = NativeStackScreenProps<HomeListType, "details">;

export const Details = ({ route, navigation }: DetailsProps) => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const { viaggio } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        automaticallyAdjustsScrollIndicatorInsets
      >
        <View style={styles.cover}>
          <ImageBackground
            source={{ uri: viaggio.img }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.subtitle}>Information:</Text>
            <Text>Destination:</Text>
            <Text>Partecipants number:</Text>
            <Text>State:</Text>
            <Text>State:</Text>

            <Divider style={{ marginVertical: 10 }} />
          </View>
          <View>
            <Text style={styles.subtitle}>Descrizione:</Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              obcaecati iure praesentium reiciendis sed, unde veniam illum rerum
              incidunt voluptates quia quam quod magni soluta beatae,
              dignissimos expedita officiis deserunt?
            </Text>
          </View>
        </View>

        <Button onPress={() => navigation.goBack()}>Vai a Home</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    cover: {
      width: "100%",
      maxHeight: 250,
      minHeight: 200,
    },

    container: {
      flex: 1,
    },
    info: {
      paddingHorizontal: 10,
      marginTop: 10,
    },
    subtitle: {
      fontSize: 18,
      fontFamily: "Montserrat-Bold",
    },
    scroll: {
      backgroundColor: theme.colors.background,
    },
  });
