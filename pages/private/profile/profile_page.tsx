import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Avatar, Button, Chip, Divider, Text } from "react-native-paper";
import { HomeListType } from "../home/paramHomeList";
import { SafeAreaViewCustom } from "../../../components/safeAreaViewCustom";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useAuth } from "../../../configurations/contexts/authContext";

export const PrivateProfilePage = () => {
  const { signOut } = useAuth();
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createPrivateStyle(theme);
  return (
    <SafeAreaViewCustom>
      <Avatar.Image
        size={150}
        source={{ uri: utente.img_profilo }}
        style={styles.profile_image}
      />

      <Divider />
      <Text variant="displaySmall">Utente</Text>
      <Button mode="contained" onPress={signOut}>
        <Text variant="titleSmall">Sign out</Text>
      </Button>
    </SafeAreaViewCustom>
  );
};

const createPrivateStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    profile_image: {
      marginVertical: 10,
      alignSelf: "center",
    },
  });

type ProfileProps = NativeStackScreenProps<HomeListType, "profile">;

const utente = {
  img_profilo:
    "https://i.pinimg.com/474x/6d/c6/57/6dc657dd4e9674358dd3abd935b1a9a2.jpg",
  username: "pippo89",
  viaggi_creati: 30,
  descrizione:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, qui voluptas architecto dicta temporibus, at saepe facere possimus delectus repellat, tempora impedit cupiditate debitis modi recusandae placeat reprehenderit harum natus.",
  paesi: [
    "Tokyo",
    "Roma",
    "Pesaro",
    "New York",
    "Catanzaro",
    "Tokyo",
    "Roma",
    "Pesaro",
    "New York",
    "Catanzaro",
  ],
};
export const PublicProfilePage = ({ route, navigation }: ProfileProps) => {
  const color = useColorScheme();
  const theme = color === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  return (
    <SafeAreaViewCustom>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* profile image */}
        <View style={styles.container_image}>
          <ImageBackground
            source={{ uri: utente.img_profilo }}
            style={{ height: "100%", width: "100%" }}
            borderRadius={500}
            resizeMode="cover"
          />
        </View>
        {/* user informations */}
        <View>
          <Text variant="titleMedium">Contry visited:</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
            {utente.paesi.map((paese: string) => (
              <Chip mode="outlined" textStyle={{ fontSize: 11 }}>
                {paese}
              </Chip>
            ))}
          </View>
        </View>
        <Divider style={{ marginTop: 20 }} />
        <View style={styles.user_info}>
          <Text variant="titleMedium">User informations:</Text>
          <Text variant="labelLarge">
            Username: <Text>{utente.username}</Text>
          </Text>
          <Text variant="labelLarge">
            Travel created: <Text>{utente.viaggi_creati}</Text>
          </Text>
        </View>
        <Divider style={{ marginVertical: 15 }} />
        <View>
          <Text variant="titleMedium">A short description about myself:</Text>
          <Text>{utente.descrizione}</Text>
        </View>
      </ScrollView>
    </SafeAreaViewCustom>
  );
};

const createStyle = (theme: typeof lightTheme) =>
  StyleSheet.create({
    container_image: {
      height: 170,
      width: 170,
      borderRadius: 50,
      alignSelf: "center",
      marginTop: 30,
    },
    user_info: {
      marginTop: 20,
      gap: 7,
    },
  });
