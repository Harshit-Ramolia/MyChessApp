import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import Theme from "./configuration/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  AcceptInvitationMutation,
  GameStartedSubscription,
  GameStatusDocument,
  GameStatusQuery,
  InviteMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "./generated/graphql";
import { CustomUpdateQuery } from "./utils/CustomQueryUpdate";
const subscriptionClient = new SubscriptionClient(
  "ws://localhost:8080/graphql",
  { reconnect: true }
);
const client = createClient({
  url: "http://localhost:8080/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
    cacheExchange({
      updates: {
        Mutation: {
          login: (result, args, cache, info) => {
            console.log("L")
            CustomUpdateQuery<LoginMutation, MeQuery>(
              cache,
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
              cache,
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
            cache.invalidate("Query", "invitationsOfUser");
            cache.invalidate("Query", "currentGame");
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
          invite: (result, args, caches, info) => {
            CustomUpdateQuery<InviteMutation, GameStatusQuery>(
              caches,
              { query: GameStatusDocument },
              result,
              (invitationResponse, query) => {
                if (invitationResponse.invite.errors) {
                  return query;
                } else {
                  return { GameStatus: 1 };
                }
              }
            );
          },
          acceptInvitation: (result, args, cache, info) => {
            CustomUpdateQuery<AcceptInvitationMutation, GameStatusQuery>(
              cache,
              { query: GameStatusDocument },
              result,
              (InvitationResult, query) => {
                if (InvitationResult.acceptInvitation === false) {
                  return query;
                } else {
                  return { GameStatus: 2 };
                }
              }
            );
            cache.invalidate("Query", "invitationsOfUser");
            cache.invalidate("Query", "currentGame");
          },
        },
        Subscription: {
          gameStarted: (result, args, cache, info) => {
            console.log("A")
            CustomUpdateQuery<GameStartedSubscription, GameStatusQuery>(
              cache,
              { query: GameStatusDocument },
              result,
              (Result, query) => {
                if (Result.gameStarted === false) {
                  return query;
                } else {
                  return { GameStatus: 2 };
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
