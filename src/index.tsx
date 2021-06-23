import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Theme from "./configuration/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery } from "./generated/graphql";
import { CustomUpdateQuery } from "./utils/CustomQueryUpdate";

const client = createClient({
  url: "http://localhost:8080/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, args, caches, info) => {
            CustomUpdateQuery<LoginMutation, MeQuery>(
              caches,
              { query: MeDocument },
              result,
              (loginResult, query) => {
                if (loginResult.login.errors) {
                  return query;
                } else {
                  return { me: loginResult.login?.user };
                }
              }
            );
          },
          logout: (result, args, caches, info) => {
            CustomUpdateQuery<LogoutMutation, MeQuery>(
              caches,
              { query: MeDocument },
              result,
              (logoutResponse, query) => {
                if (!logoutResponse.logout) {
                  return query;
                } else {
                  return { me: null };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
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
