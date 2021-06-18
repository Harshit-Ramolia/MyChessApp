import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import Theme from "./configuration/theme";
import { ThemeProvider  } from "@material-ui/core/styles";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
