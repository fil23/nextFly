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
import { IconButton, Text } from "react-native-paper";
import { CustomButtonYellow } from "../../../components/buttons/CustomButtonYellow";
import { supabase } from "../../../configurations/supabase_config";
import { useAuth } from "../../../configurations/contexts/authContext";
import type { TravelsGenerated } from "../../../constants/interfaces/travel";
import { resolve } from "path";
import { DaysList } from "../../../components/dayslist";
import Toast from "react-native-toast-message";

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



  const saveTravel = async () =>{
    setOnLoad(true);
     try {
      handlerInfoSupa("profile_image", uriImage)
    
      const { data, error } = await supabase
        .from("travelsGenerated")
        .insert(travelGenerated).select("id")

      if (error && data === null) {
        Toast.show({
            type:'error',
            text1:'Error',
            text2:'Error while saving!'
          })
        console.error("Errore:", error.message, error.details);
      }else{
        handlerInfoSupa("id_travel_generated", data[0].id );
        await sleep(2000);
        const {error} = await supabase.from("travels").insert(infoSupa)
        if(error){
          Toast.show({
            type:'error',
            text1:'Error',
            text2:'Error while saving!'
          })
          console.error("Errore inserimento info viaggio:",error.message,error.details);
        }else{
          console.log("Viaggio salvato con successo:" + infoSupa.id_continent);
        }
        
      }
     } catch (error: any) {
       Toast.show({
            type:'error',
            text1:'Error',
            text2:'Error while saving!'
        })
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

            {/* travel informations */}
            <View style={styles.informations_section}>
              <View style={styles.info}>
                <Text variant="titleSmall">Title:  </Text>
                <Text variant="bodyMedium">{infoSupa.title}</Text>
              </View>

              {/* destination */}
              <View style={styles.info}>
                <Text variant="titleSmall">Destination:  </Text>
                <Text variant="bodyMedium">{infoSupa.destination}</Text>
              </View>
              {/* Arrive date  */}
              <View style={styles.info}>
                <Text variant="titleSmall">Arrive date:  </Text>
                <Text variant="bodyMedium">{infoSupa.arrive_date?.toLocaleDateString()}</Text>
              </View>
              {/* departure date  */}
              <View style={styles.info}>
                <Text variant="titleSmall">Departure date:  </Text>
                <Text variant="bodyMedium">{infoSupa.departure_date?.toLocaleDateString()}</Text>
              </View>

              {/* Travel plan */}
              <View>
                <Text variant="titleSmall">Travel plan:  </Text>
                <DaysList data={travelGenerated.travel?? []}/>
              </View>

            </View>
            {/* Save button */}
            <View>
              <CustomButtonYellow function={saveTravel} text="Save" disabled={infoSupa.title != null? false : true} />
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
      flex: 0.9,
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

    informations_section:{
      
      paddingLeft:'5%',
      marginVertical:'5%'
    },
    info:{
      flexDirection:'row',
     
      flexWrap:'wrap',
      alignItems:'center'
    }
  });
