import React, { useState } from "react";
import Chessboard, { Position } from "chessboardjsx";
import { InitialChess } from "../../constants/initialChess";
import { Button, makeStyles, Theme } from "@material-ui/core";

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

const Playground: React.FC = () => {
  const [positionValue, setPositionValue] = useState<Position>({
    ...InitialChess,
  });
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root}>
        <div>
          <Button
            className={classes.buttons}
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => {
              setPositionValue({ ...InitialChess });
            }}
          >
            Initial
          </Button>
          <Button
            className={classes.buttons}
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => setPositionValue({})}
          >
            Clear
          </Button>
        </div>
        <Chessboard
          position={positionValue}
          getPosition={(position) => {
            setPositionValue(position);
          }}
          sparePieces={true}
          width={400}
        />
      </div>
    </React.Fragment>
  );
};

export default Playground;
