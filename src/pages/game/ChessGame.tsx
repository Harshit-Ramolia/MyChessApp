import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import {
  ChessClass,
  useCurrentGameQuery,
  useGameStartedSubscription,
  useInvalidateQueryMutation,
  useMeQuery,
  useMoveSubscription,
  useSaveMoveMutation,
} from "../../generated/graphql";
import { Typography } from "@material-ui/core";

const Chess = require("chess.js");
interface ChessGameProps {
  currentGame: ChessClass | any;
}

const ChessGame: React.FC<ChessGameProps> = ({ currentGame }) => {
  const [{ data: currentGameData, fetching }] =
    useCurrentGameQuery();
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
  const [chess] = useState<ChessInstance>(
    new Chess(
      (!fetching && currentGameData?.currentGame?.lastPosition) ||
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    )
  );

  const [fen, setFen] = useState(chess.fen());
  const [, saveMove] = useSaveMoveMutation();
  useMoveSubscription(
    {
      variables: { id: me?.me?._id || "" },
    },
    (_, data) => {
      if (data.move) {
        const objectMove = JSON.parse(data.move);
        if (chess.move(objectMove)) {
          setTimeout(() => {
            setFen(chess.fen());
          }, 300);
        }
      }
      return data;
    }
  );

  const player = {
    username: me?.me?.username,
    playingAs: me?.me?._id === currentGame.white._id ? "w" : "b",
  };

  const opponent = {
    username:
      player.playingAs === "w"
        ? currentGame.black.username
        : currentGame.white.username,
    playingAs: player.playingAs === "w" ? "b" : "w",
  };

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setFen(chess.fen());
      const MoveString = JSON.stringify(move);
      saveMove({
        chessID: currentGame._id,
        position: chess.fen(),
        move: MoveString,
      });
    }
  };

  return (
    <div className="flex-center">
      <Typography variant="h5" align="center" style={{ margin: "10px" }}>
        You vs {opponent.username}
      </Typography>
      <Typography variant="h6" align="center" style={{ margin: "10px" }}>
        {fen.split(" ")[1] === player.playingAs
          ? "Your Turn"
          : "Waiting for opponent to move"}
      </Typography>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) => {
          let valid = false;
          if (move.piece[0] === "w" && me?.me?._id === currentGame.white._id) {
            valid = true;
          }
          if (move.piece[0] === "b" && me?.me?._id === currentGame.black._id) {
            valid = true;
          }
          if (valid)
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            });
        }}
      />
    </div>
  );
};

export default ChessGame;
