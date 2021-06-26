import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import {
  ChessClass,
  useMeQuery,
  useMoveSubscription,
  useSaveMoveMutation,
} from "../../generated/graphql";

const Chess = require("chess.js");
interface ChessGameProps {
  currentGame: ChessClass | any;
}

const ChessGame: React.FC<ChessGameProps> = ({ currentGame }) => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());
  const [, saveMove] = useSaveMoveMutation();
  const [{ data: me }] = useMeQuery();
  useMoveSubscription(
    {
      variables: { id: me?.me?._id || "" },
    },
    (_, data) => {
      if (data.move) {
        const objectMove = JSON.parse(data.move);
        if (chess.move(objectMove)) {
          console.log(chess.fen());
          setTimeout(() => {
            setFen(chess.fen());
          }, 300);
        }
        // setFen(data.move);
      }
      return data;
    }
  );

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
      <h1>You vs </h1>
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
