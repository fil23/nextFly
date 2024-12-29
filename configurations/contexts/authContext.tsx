import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { createContext, ReactNode, useContext, useState } from "react";
import { chiamata_publ_post_async } from "../../api/calls/chiamate";
import { endpoints } from "../../api/endpoints/endpoints";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  utente: Utente;
  setUtente: any;
  token: string | null;
  setToken: any;
  signInWithGoogle: any;
  signOutWithGoogle: any;
  onLoad: boolean;
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
    password: "",
    username: "",
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
        password: userInfo.data?.serverAuthCode,
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
          break;
        case statusCodes.IN_PROGRESS:
          console.error("Operazione in corso");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error("Servizi di Google Play non disponibili");
          break;
        case 409:
          console.error("utente già registrato");
          break;

        default:
          console.error("Errore durante l'accesso", error);
          break;
      }

      setOnLoad(false);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      // setOnLoad(true);
      await GoogleSignin.signOut();
      await SecureStore.deleteItemAsync("token");
      console.log("Sign out avvenuto con successo");
    } catch (error) {
      setErrore({ errore: true, messaggio: "Errpre durante il signOut" });
      // } finally {
      //   setOnLoad(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        utente,
        setUtente,
        token,
        setToken,
        signInWithGoogle,
        signOutWithGoogle,
        onLoad,
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
