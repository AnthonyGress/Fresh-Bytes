import React from "react";
import ReactDOM from "react-dom";
import {
  MuiThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import "./index.css";
import App from "./App";
// import LocalServiceWorkerRegister from "./sw-register";

import * as serviceWorker from "./serviceWorker";

let theme = createTheme({
  palette: {
    primary: {
      // main: "#c82427",
      main: "#a81e00",
    },
    secondary: {
      main: "#ffcd27",
    },
    light: {
      main: "#fafafa",
    },
    dark: {
      main: "#0a0a0a",
    },
  },
  typography: {
    useNextVariants: true,
  },
});
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// LocalServiceWorkerRegister();
