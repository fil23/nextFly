import { createContext, ReactNode, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { supabase } from "../supabase_config";

/**
 * This context permit to menage the authentication of the app and the
 * permit to save and get the user's informations in every part of application.
 * It works as a context.
 */
interface AuthContextType {
  utente: Utente;
  setUtente: any;
  handleUtente: (name: string, value: string) => void;
  token: string | null;
  setToken: any;
  signIn: any;
  signUp: any;
  onLoad: boolean;
  setOnLoad: any;
  signOut: () => void;
}

//Interface to menage errors during authentication
interface ErroreInt {
  messaggio: string | null;
  errore: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const SECRET_KEY = process.env.EXPO_PUBLIC_SECRET_KEY ?? " ";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [utente, setUtente] = useState<Utente>({
    id: "",
    email: "",
  });
  const [token, setToken] = useState<string | null>(null);

  const [onLoad, setOnLoad] = useState<boolean>(false);

  //App sign IN with email and password
  const signIn = async (email: string, password: string) => {
    setOnLoad(true);

    //call to supabase db to sign In
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.warn("Errore: " + error?.message);

    setOnLoad(false);
    if (error) {
      //I'll show to user a notify if the sign in will be a failure
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something has gone wrong during login",
      });
      console.error(error.message);
    } else {
      //if it's all ok I set token so the user can go on homepage automatically
      SecureStore.setItemAsync("token", data.user.id);

      //setUser to have informations in memory
      setUtente({ email: data.user?.email ?? email, id: data.user?.id ?? "" });
    }
  };

  //Application signUp with email and password
  const signUp = async (email: string, password: string) => {
    setOnLoad(true);
    //signUp on supabase db
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    //if there is an error in supabase call

    setOnLoad(false);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something has gone wrong during sign up",
      });
    } else {
      //set token if sign up is successfull
      SecureStore.setItemAsync("token", data.user?.id ?? "");

      //setUser to have informations in memory
      setUtente({ email: data.user?.email ?? email, id: data.user?.id ?? "" });
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
        signIn,
        signUp,
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
