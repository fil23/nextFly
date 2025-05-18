import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppState } from "react-native";

//SupabaseClient to do api call
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_CLIENT_KEY ?? " ";
const SUPABASE_URL = "https://zjqbzdqlcqyiyjfbbkau.supabase.co";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY,{
    auth:{
        storage:AsyncStorage,
        autoRefreshToken:true,
        persistSession:true,
        detectSessionInUrl:false,
        
    }
});

AppState.addEventListener('change',(state)=>{
    if(state === 'active'){
        supabase.auth.startAutoRefresh()
    }else{
        supabase.auth.stopAutoRefresh()
    }
})