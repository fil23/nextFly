import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF5722',
    accent: '#FF9800',
    background: '#FFF3E0',
    surface: '#FFFFFF',
    text: '#212121',
    disabled: '#BDBDBD',
    placeholder: '#616161',
    error: '#D32F2F',
    borderColor: '#FF9800'

  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FF7043',
    accent: '#FF8A65',
    background: '#000000',
    surface: '#1E1E1E',
    text: '#FFE0B2',
    disabled: '#616161',
    placeholder: '#FFCCBC6e',
    error: '#FF5252',
    borderColor: '#FFCCBC'

  },
};
