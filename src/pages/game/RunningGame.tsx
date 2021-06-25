import { Button } from "@material-ui/core";
import React from "react";
import {
  useCurrentGameQuery,
  useEndGameMutation,
} from "../../generated/graphql";
import ChessGame from "./ChessGame";

interface RunningGameProps {}

const RunningGame: React.FC<RunningGameProps> = ({}) => {
  const [, endGame] = useEndGameMutation();
  const [{ data, fetching }] = useCurrentGameQuery();
  let body = null;
  if (!fetching && data?.currentGame !== undefined) {
    body = (
      <React.Fragment>
        <Button
          onClick={() => {
            endGame({ chessID: data.currentGame?._id || "" });
          }}
        >
          End Game
        </Button>
        <ChessGame currentGame={data.currentGame} />
      </React.Fragment>
    );
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default RunningGame;
