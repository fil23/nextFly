import { useColorScheme } from "react-native";
import { ErrorToast } from "react-native-toast-message";
import { darkTheme, lightTheme } from "./theme";

export const toastConfig = {
  error: (props: any) => {
    const color = useColorScheme();
    const theme = color === "dark" ? darkTheme : lightTheme;
    return (
      <ErrorToast
        {...props}
        style={{
          backgroundColor: theme.colors.surface,
          borderLeftColor: theme.colors.error,
          flexWrap: "wrap",
        }}
        text1Style={{
          color: theme.colors.error,

          fontSize: 17,
        }}
        text2Style={{
          color: theme.colors.text,
          fontSize: 14,
          flexWrap: "wrap",
        }}
      />
    );
  },
};
