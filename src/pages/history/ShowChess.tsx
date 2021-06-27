import { Button, Dialog } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { makeStyles, Theme } from "@material-ui/core";

interface ShowChessProps {
  setOpen: Function;
  open: boolean;
  positions: Array<string>;
}

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

const ShowChess: React.FC<ShowChessProps> = ({ setOpen, open, positions }) => {
  const InitialPosition =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  const [positionValue, setPositionValue] = useState<string>(InitialPosition);
  const [number, setNumber] = useState<number>(0);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setPositionValue(InitialPosition);
    setNumber(0)
  }, [positions]);
  const classes = useStyles();
  positions.reverse();
  positions = [InitialPosition, ...positions];
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={classes.root}>
        <Chessboard position={positionValue} width={400} />
        <div>
          <Button
            className={classes.buttons}
            color="primary"
            variant="outlined"
            size="small"
            disabled={number === 0}
            onClick={() => {
              setPositionValue(positions[number - 1]);
              setNumber((prev) => prev - 1);
            }}
          >
            Previous
          </Button>
          <Button
            className={classes.buttons}
            color="primary"
            variant="outlined"
            size="small"
            disabled={number === positions.length - 1}
            onClick={() => {
              setPositionValue(positions[number + 1]);
              setNumber((prev) => prev + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ShowChess;
