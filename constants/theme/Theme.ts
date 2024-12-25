import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2D3748',
    secondary: '#FFB400', // Rosso carminio
    accent: '#FF9800',
    background: '#F7FAFC',
    surface: '#E2E8F0',
    text: '#2D3748',
    disabled: '#BDBDBD',
    placeholder: '#616161',
    error: '#C62828',
    success: '#4CAF50',
    borderColor: '#FFC107',
    link: '#24a0ff',
    secondary_text: '#6C757D',
    shadow: '#8c8c8c',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4A5568',
    secondary: '#FFB400', // Oro ambrato
    accent: '#FF8A65',
    background: '#1A202C',
    surface: '#2D3748',
    text: '#EAEAEA',
    disabled: '#616161',
    placeholder: '#FFCCBC6e',
    error: '#EF5350',
    success: '#81C784',
    borderColor: '#FFD54F',
    link: '#24a0ff',
    secondary_text: '#A4A4A4',
    shadow: '#575757',
  },
};
