import { createClient } from "@supabase/supabase-js";

//SupabaseClient to do api call
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? " ";
const SUPABASE_URL = "https://zjqbzdqlcqyiyjfbbkau.supabase.co";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);