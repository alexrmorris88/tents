import React from "react";
import {
  SettingsConsumer,
  SettingsProvider,
} from "../contexts/settings-context";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <SettingsConsumer>
        {({ settings }) => (
          <ThemeProvider
            theme={createTheme({
              direction: settings.direction,
              responsiveFontSizes: settings.responsiveFontSizes,
              mode: settings.theme,
            })}
          >
            <Component {...pageProps} />
          </ThemeProvider>
        )}
      </SettingsConsumer>
    </SettingsProvider>
  );
}

export default MyApp;
