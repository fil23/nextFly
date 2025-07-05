import React, { useCallback, useEffect, useState } from "react";

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useTravel } from "../../../configurations/contexts/travelContext";
import { darkTheme, lightTheme } from "../../../constants/theme/theme";
import { SplashScreen } from "../../splash/splashScreen";
import { IconButton } from "react-native-paper";
import { CustomButtonYellow } from "../../../components/buttons/CustomButtonYellow";
import { supabase } from "../../../configurations/supabase_config";
import { useAuth } from "../../../configurations/contexts/authContext";
import type { TravelsGenerated } from "../../../constants/interfaces/travel";
import { resolve } from "path";

export const TravelGeneratedApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const styles = createStyle(theme);
  const { session } = useAuth();
  const { infoSupa, handlerInfoSupa, travelGenerated } = useTravel();
  const [uriImage, setUriImage] = useState<string>(
    "https://storage.googleapis.com/nextfly-bucket/nextfly-background/Tokyo%20nights2jpg.jpg"
  );
  const [onLoad, setOnLoad] = useState<boolean>(false);

  // TODO:Insert possibility to modify the travel's cover image
  const modify_cover = () => {
    console.log("cover modificate");
  };

  const sleep = (millisecond : number) =>{
    return new Promise(resolve => setTimeout(resolve,millisecond));
  }

  // const saveTravel = useCallback(async () => {
  //   setOnLoad(true);
  //   try {
  //     handlerInfoSupa("profile_image", uriImage);

  //     console.log(JSON.stringify(travelGenerated));
  //     const { data, error1 } = await supabase
  //       .from("travels_generated")
  //       .insert(travelGenerated)
  //       .select("id");
  //     console.warn("Error: " + error1?.message);
  //     console.log("data" + data[0]?.id);
  //     handlerInfoSupa("travel_id", data[0]?.id);

  //     const { error } = await supabase.from("travels").insert(infoSupa);

  //     console.log("Viaggio salvato con successo:" + infoSupa.id_continent);
  //   } catch (error: any) {
  //     console.error(error);
  //   } finally {
  //     setOnLoad(false);
  //   }
  // }, [uriImage, info, infoSupa, travelGenerated]);

  const saveTravel = async () =>{
    setOnLoad(true);
     try {
      handlerInfoSupa("profile_image", uriImage)
      console.log("travel gen: "+JSON.stringify(travelGenerated.travel))
      const {data:{user}} = await supabase.auth.getUser();
      console.log("Utente: ",user?.id);
      
      const { data: userInfo, error: authErr } = await supabase.auth.getUser();

      console.log("Auth UID:", userInfo?.user?.id);
      const session = (await supabase.auth.getSession()).data.session;


      const { data, error } = await supabase
        .from("travelsGenerated")
        .insert(travelGenerated).select("id")

      if (error && data === null) {
        console.error("Errore:", error.message, error.details);
      }else{
        handlerInfoSupa("id_travel_generated", data[0].id );
        await sleep(2000);
        const {error} = await supabase.from("travels").insert(infoSupa)
        if(error){
          console.error("Errore inserimento info viaggio:",error.message,error.details);
        }else{
          console.log("Viaggio salvato con successo:" + infoSupa.id_continent);
        }
        
      }
     } catch (error: any) {
       console.error(error+ " infoSupa:" );
     } finally {
       setOnLoad(false);
     }
  }

  return (
    <>
      {onLoad ? (
        <SplashScreen />
      ) : (
        <SafeAreaView style={styles.safe_area}>
          <ScrollView
            contentInsetAdjustmentBehavior="always"
            automaticallyAdjustsScrollIndicatorInsets
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {/* travel's cover */}
            <View style={styles.cover_container}>
              <ImageBackground
                source={{ uri: uriImage }}
                resizeMode="cover"
                imageStyle={{ height: "100%", width: "100%" }}
                style={styles.img_cover}
              />

              {/* Button to modify the travel's image  */}

              <IconButton
                icon="image-edit-outline"
                iconColor={theme.colors.yellow_star}
                size={35}
                style={styles.img_cover_button}
                onPress={modify_cover}
              />
            </View>
            <View>
              <CustomButtonYellow function={saveTravel} text="Save" />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const createStyle = (theme: typeof darkTheme) =>
  StyleSheet.create({
    safe_area: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    main_scroll: {
      backgroundColor: theme.colors.background,
    },
    cover_container: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxHeight: 300,
      minHeight: 200,
    },

    img_cover: {
      width: "100%",
      height: "100%",
    },

    img_cover_button: {
      position: "absolute",
      top: 10,
      right: 20,
    },
  });
