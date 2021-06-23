import { Typography } from "@material-ui/core";
import React from "react";
import { useGameStatusQuery } from "../../generated/graphql";
import Information from "./Information";
import StartNewGame from "./StartNewGame";

const Game = () => {
  const [{ data, fetching }] = useGameStatusQuery();
  let body = null;
  if (!fetching) {
    if (
      !data?.GameStatus ||
      data?.GameStatus === 0 ||
      data?.GameStatus === -1
    ) {
      body = <Information status={data ? data.GameStatus : -1} />;
    } else if (data.GameStatus === 1) {
      body = <Typography>Waiting ...</Typography>;
    } else {
      // body = (
      // <StartNewGame GameStatus={GameStatus} setGameStatus={setGameStatus} />
      // );
    }
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default Game;
