import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { createContext, ReactNode, useContext, useState } from "react";
import { chiamata_publ_post_async } from "../../api/calls/chiamate";
import { endpoints } from "../../api/endpoints/endpoints";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

interface AuthContextType {
  utente: Utente;
  setUtente: any;
  handleUtente: (name: string, value: string) => void;
  token: string | null;
  setToken: any;
  signInWithGoogle: any;
  signOutWithGoogle: any;
  onLoad: boolean;
  setOnLoad: any;
  signOut: () => void;
}

interface ErroreInt {
  messaggio: string | null;
  errore: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [utente, setUtente] = useState<Utente>({
    id: "",
    email: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [errore, setErrore] = useState<ErroreInt | null>();
  const [onLoad, setOnLoad] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    setOnLoad(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;
      console.log(userInfo);

      chiamata_publ_post_async(endpoints.auth.googleSignIn, {
        token: idToken,
        password: userInfo.data?.user.id,
        email: userInfo.data?.user.email,
      })
        .then(async (risp) => {
          await SecureStore.setItemAsync("token", risp.data.token);
          setToken(risp.data.token);
        })
        .catch((err) => {
          setErrore({
            errore: true,
            messaggio: "Errore durante il salvataggio del token",
          });
        })
        .finally(() => {
          setOnLoad(false);
        });
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.error("L'utente ha cancellato l'accesso");
          Alert.alert(
            "Error",
            "Something is gone wrong during the authentication",
            [{ text: "OK", onPress: () => console.log("Cancel pressed") }],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  " This alert was dismissed by tapping outside of the alert dialog.,"
                ),
            }
          );
          break;
        case statusCodes.IN_PROGRESS:
          console.error("Operazione in corso");
          Alert.alert(
            "Error",
            "Something is gone wrong during the authentication",
            [{ text: "OK", onPress: () => console.log("Cancel pressed") }],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  " This alert was dismissed by tapping outside of the alert dialog.,"
                ),
            }
          );
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error("Servizi di Google Play non disponibili");
          Alert.alert(
            "Error",
            "Something is gone wrong during the authentication",
            [{ text: "OK", onPress: () => console.log("Cancel pressed") }],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  " This alert was dismissed by tapping outside of the alert dialog.,"
                ),
            }
          );
          break;
        case 409:
          console.error("utente già registrato");
          Alert.alert(
            "Error",
            "Something is gone wrong during the authentication",
            [{ text: "OK", onPress: () => console.log("Cancel pressed") }],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  " This alert was dismissed by tapping outside of the alert dialog.,"
                ),
            }
          );
          break;

        default:
          console.error("Errore durante l'accesso", error);
          Alert.alert(
            "Error",
            "Something is gone wrong during the authentication",
            [{ text: "OK", onPress: () => console.log("Cancel pressed") }],
            {
              cancelable: true,
            }
          );
          break;
      }

      setOnLoad(false);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      setOnLoad(true);
      await GoogleSignin.signOut();
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("email");
      console.log("Sign out avvenuto con successo");
    } catch (error) {
      setErrore({ errore: true, messaggio: "Errpre durante il signOut" });

      Alert.alert(
        "Error",
        "Something is gone wrong during the authentication",
        [{ text: "OK", onPress: () => console.log("Cancel pressed") }],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              " This alert was dismissed by tapping outside of the alert dialog.,"
            ),
        }
      );
    } finally {
      setOnLoad(false);
    }
  };

  const handleUtente = (name: string, value: string) => {
    setUtente((prev) => ({ ...prev, [name]: value }));
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    setUtente({ id: "", email: "" });
    await SecureStore.deleteItemAsync("email");
    setToken(null);
    console.log("Sign ot successed");
  };

  return (
    <AuthContext.Provider
      value={{
        utente,
        setUtente,
        handleUtente,
        token,
        setToken,
        signInWithGoogle,
        signOutWithGoogle,
        onLoad,
        setOnLoad,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
