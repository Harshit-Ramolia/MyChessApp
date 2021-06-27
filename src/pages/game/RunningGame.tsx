import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import {
  useCurrentGameQuery,
  useEndGameMutation,
} from "../../generated/graphql";
import ChessGame from "./ChessGame";

interface RunningGameProps {}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    align: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    margin: "10px 10px",
  },
}));
const RunningGame: React.FC<RunningGameProps> = () => {
  const [, endGame] = useEndGameMutation();
  const classes = useStyles();
  const [{ data, fetching }] = useCurrentGameQuery();
  let body = null;
  if (!fetching && data?.currentGame !== undefined) {
    body = (
      <React.Fragment>
        <div className={classes.root}>
          <Button
            onClick={() => {
              endGame({ chessID: data.currentGame?._id || "" });
            }}
            variant="outlined"
            size="small"
            color="secondary"
          >
            End Game
          </Button>
          <ChessGame currentGame={data.currentGame} />
        </div>
      </React.Fragment>
    );
  }
  return <React.Fragment>{body}</React.Fragment>;
};

export default RunningGame;
