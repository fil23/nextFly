import { MD3LightTheme, MD3DarkTheme, configureFonts } from "react-native-paper";
import { fontConfig } from "./fontConfiguration";


export const lightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  fonts:configureFonts({config:fontConfig}),
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2D3748',
    secondary: '#FFB400', // Rosso carminio
    accent: '#FF9800',
    background: '#F7FAFC',
    surface: '#E2E8F0',
    text: '#2D3748',
    title:'#d9d9d9',
    disabled: '#BDBDBD',
    placeholder: '#616161',
    error: '#C62828',
    success: '#4CAF50',
    borderColor: '#FFC107',
    link: '#24a0ff',
    secondary_text: '#6C757D',
    shadow: '#8c8c8c',
    chip_success:'#90f493de',
    chip_error: '#ff5252c7',
    yellow_star:'#ffeb52',
    google_button_color:'#016fd5'
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  fonts:configureFonts({config:fontConfig}),
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4A5568',
    secondary: '#FFB400', // Oro ambrato
    accent: '#FF8A65',
    background: '#1A202C',
    surface: '#2D3748',
    text: '#EAEAEA',
    title:'#EAEAEA',
    disabled: '#616161',
    placeholder: '#EAEAEA75',
    error: '#EF5350',
    success: '#81C784',
    borderColor: '#FFD54F',
    link: '#24a0ff',
    secondary_text: '#121212',
    shadow: '#000000',
    chip_success : '#86ca8ac7',
    chip_error : '#EF535099',
    yellow_star:'#ffeb52',
    google_button_color:'#016fd5'
  },
};
