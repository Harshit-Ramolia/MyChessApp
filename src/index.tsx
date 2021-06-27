import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Theme from "./configuration/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "urql";
import client from "./configuration/urqlClient";

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
