import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

const Playground: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    // setFen(chess.fen());
    chess.move(move);
    setFen(chess.fen());
    // if (chess.move(move)) {
    // }
  };

  return (
    <React.Fragment>
      <Chessboard
        position={{a2: "wP", b2: "wP", c2: "wP", d2: "wP", e2: "wP", f2: "wP", g2: "wP", h2: "wP"}}
        undo={true}
        // onDrop={(move) =>
        //   handleMove({
        //     from: move.sourceSquare,
        //     to: move.targetSquare,
        //     promotion: "q",
        //   })
        // }
        // boardStyle={{ backgroundColor: "rgb(181, 136, 99)" }}
        // dropSquareStyle={{ boxShadow: "inset 0 0 1px 4px red" }}
        // onPieceClick={(piece)=>(console.log(piece))}
      />
    </React.Fragment>
  );
};

export default Playground;
