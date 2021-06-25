import { Typography } from "@material-ui/core";
import React from "react";
import {
  useGameStartedSubscription,
  useGameStatusQuery,
  useMeQuery,
} from "../../generated/graphql";
import Information from "./Information";
import RunningGame from "./RunningGame";
import StartNewGame from "./StartNewGame";

const Game = () => {
  const [{ data, fetching }] = useGameStatusQuery();
  let body = null;
  const [{ data: me }] = useMeQuery();
  const [{ data: gameStartedData }] = useGameStartedSubscription({
    variables: {
      id: me?.me?._id || "",
    },
  });
  if (!fetching) {
    if (
      !data?.GameStatus ||
      data?.GameStatus === 0 ||
      data?.GameStatus === -1
    ) {
      body = <Information status={data ? data.GameStatus : -1} />;
    } else if (data.GameStatus === 1) {
      body = <Typography>Waiting ...</Typography>;
    } else if (gameStartedData?.gameStarted || data.GameStatus === 2) {
      body = <RunningGame></RunningGame>;
    }
    console.log(gameStartedData, data)
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default Game;
