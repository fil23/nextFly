import { DarkTheme } from "@react-navigation/native";
import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5722',
    accent: '#FF9800',
    background: '#FFF3E0',
    surface: '#FFFFFF',
    text: '#212121',
    disabled: '#BDBDBD',
    placeholder: '#616161',
    error: '#D32F2F',
  },
};

export const darkTheme = {
  ...DarkTheme,
  roundness: 8,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF7043',
    accent: '#FF8A65',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFE0B2',
    disabled: '#616161',
    placeholder: '#FFCCBC',
    error: '#FF5252',
  },
};
