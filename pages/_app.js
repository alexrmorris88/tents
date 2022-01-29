// React-Next Imports
import React from "react";
// Context Provider Imports
import {
  SettingsConsumer,
  SettingsProvider,
} from "../contexts/settings-context";
import { CalendarProvider } from '../contexts/calendar-context'
// UI Imports
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
import { wrapper } from "../state/store";
import { Provider } from "next-auth/client";
import "./react-datepicker-custom.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
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
              <CalendarProvider>
                  <Component {...pageProps} />
              </CalendarProvider>
            </ThemeProvider>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
