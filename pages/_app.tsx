import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  // const persistor = persistStore(store)
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#00AB55",
        dark: "#171721;",
      },
    },
    typography: {
      fontFamily: "Public Sans,  sans-serif",
      htmlFontSize: 16,
      h1: {
        fontFamily: "Public Sans,  sans-serif",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "64px",
        lineHeight: "80px",
        color: "#FFF",
        "@media (max-width: 900px)": {
          fontSize: "40px",
          lineHeight: "50px",
        },
        "@media (max-width: 400px)": {
          fontSize: "32px",
          lineHeight: "40px",
        },
      },
      h3: {
        fontFamily: "Public Sans,  sans-serif",
        fontStyle: "normal",
        fontSize: "32px",
        lineHeight: "48px",
        fontWeight: 700,
        letterSpacing: "0px",
        "@media (max-width: 600px)": {
          fontSize: "24px",
          lineHeight: "36px",
        },
      },
      subtitle2: {
        fontFamily: "Public Sans,  sans-serif",
        fontStyle: "normal",
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "20px",
      },
      body2: {
        fontFamily: "Public Sans,  sans-serif",
        fontStyle: "normal",
        fontSize: "14px",
        fontWeight: 700,
        lineHeight: "20px",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "10px",
            height: 44,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            border: "1px solid gray",
            borderRadius: "10px",
            fontWeight: 700,
            "&.MuiFilledInput-root": {
              backgroundColor: "#FFF",
              "&:before, &:after": {
                display: "none",
              },
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            marginBottom: "8px",
            width: '100%',
          }
        }
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <Component {...props} />
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
