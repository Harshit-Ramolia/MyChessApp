import React from "react";

interface StartNewGameProps {
  GameStatus: 0 | 1 | 2;
  setGameStatus: Function;
}

const StartNewGame: React.FC<StartNewGameProps> = ({
  GameStatus,
  setGameStatus,
}) => {
  let body = null;
  // if (GameStatus === 0) {
  //   body = (

  //   );
  // } else if (GameStatus === 1) {

  // }
  return <React.Fragment>{body}</React.Fragment>;
};

export default StartNewGame;
