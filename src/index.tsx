import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Theme from "./configuration/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  GameStatusDocument,
  GameStatusQuery,
  InvitationMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "./generated/graphql";
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
            CustomUpdateQuery<LoginMutation, GameStatusQuery>(
              caches,
              { query: GameStatusDocument },
              result,
              (loginResult, query) => {
                if (loginResult.login?.user?.gameStatus == null) {
                  return query;
                } else {
                  return { GameStatus: loginResult.login.user.gameStatus };
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
            CustomUpdateQuery<LogoutMutation, GameStatusQuery>(
              caches,
              { query: GameStatusDocument },
              result,
              (logoutResponse, query) => {
                if (!logoutResponse.logout) {
                  return query;
                } else {
                  return { GameStatus: -1 };
                }
              }
            );
          },
          invitation: (result, args, caches, info) => {
            CustomUpdateQuery<InvitationMutation, GameStatusQuery>(
              caches,
              { query: GameStatusDocument },
              result,
              (invitationResponse, query) => {
                if (invitationResponse.invitation.errors) {
                  return query;
                } else {
                  return { GameStatus: 1 };
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
