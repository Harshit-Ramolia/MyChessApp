import { createClient, dedupExchange, fetchExchange } from "urql";
import { subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  AcceptInvitationMutation,
  CancelInvitationMutation,
  EndGameMutation,
  GameStatusDocument,
  GameStatusQuery,
  InvalidateQueryMutation,
  InviteMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";
import { CustomUpdateQuery } from "../utils/CustomQueryUpdate";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const subscriptionClient = new SubscriptionClient(`wss://chessharshit.herokuapp.com/graphql`, {
//   reconnect: true,
// });

const subscriptionClient = new SubscriptionClient(`ws://localhost:8080/graphql`, {
  reconnect: true,
});

const client = createClient({
  url: `/graphql`,
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
            cache.invalidate("Query", "historyGames");
            cache.invalidate("Query", "currentGame");
          },
          logout: (result, args, cache, info) => {
            CustomUpdateQuery<LogoutMutation, MeQuery>(
              cache,
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
              cache,
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
            cache.invalidate("Query", "invitationsOfUser");
            cache.invalidate("Query", "historyGames");
            cache.invalidate("Query", "currentGame");
          },
          invite: (result, args, cache, info) => {
            CustomUpdateQuery<InviteMutation, GameStatusQuery>(
              cache,
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
          invalidateQuery: (result, args, cache, info) => {
            cache.invalidate("Query", "invitationsOfUser");
            cache.invalidate("Query", "currentGame");
            CustomUpdateQuery<InvalidateQueryMutation, GameStatusQuery>(
              cache,
              { query: GameStatusDocument },
              result,
              (InvalidateQueryResult, query) => {
                if (typeof InvalidateQueryResult.invalidateQuery !== "number") {
                  return query;
                } else {
                  return { GameStatus: InvalidateQueryResult.invalidateQuery };
                }
              }
            );
          },
          endGame: (result, args, cache, info) => {
            CustomUpdateQuery<EndGameMutation, GameStatusQuery>(
              cache,
              { query: GameStatusDocument },
              result,
              (Result, query) => {
                if (!Result.endGame) {
                  return query;
                } else {
                  return { GameStatus: 0 };
                }
              }
            );
          },
          cancelInvitation: (result, args, cache, info) => {
            CustomUpdateQuery<CancelInvitationMutation, GameStatusQuery>(
              cache,
              { query: GameStatusDocument },
              result,
              (Result, query) => {
                if (!Result.cancelInvitation) {
                  return query;
                } else {
                  return { GameStatus: 0 };
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

export default client;
