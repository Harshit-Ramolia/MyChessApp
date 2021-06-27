import React from "react";
import {
  useGameStartedSubscription,
  useGameStatusQuery,
  useInvalidateQueryMutation,
  useMeQuery,
} from "../../generated/graphql";
import Information from "./Information";
import RunningGame from "./RunningGame";
import Waiting from "./Waiting";

const Game = () => {
  const [{ data, fetching }] = useGameStatusQuery();
  let body = null;
  const [{ data: me }] = useMeQuery();
  const [, invalidateQuery] = useInvalidateQueryMutation();
  useGameStartedSubscription(
    {
      variables: {
        id: me?.me?._id || "",
      },
    },
    (_, response) => {
      if (response?.gameStarted) {
        invalidateQuery();
      }
      return response;
    }
  );
  if (!fetching) {
    if (
      !data?.GameStatus ||
      data?.GameStatus === 0 ||
      data?.GameStatus === -1
    ) {
      body = <Information status={data ? data.GameStatus : -1} />;
    } else if (data.GameStatus === 1) {
      body = <Waiting />;
    } else if (data.GameStatus === 2) {
      body = <RunningGame></RunningGame>;
    }
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default Game;
