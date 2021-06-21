import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import Theme from "./configuration/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8080/graphql",
});

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
