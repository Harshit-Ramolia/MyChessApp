import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import InvitationForm from "./InvitationForm";
import React, { useState } from "react";

interface InformationProps {
  status: Number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Information: React.FC<InformationProps> = ({ status }) => {
  const classes = useStyles();
  const [infoLevel, setInfoLevel] = useState<1 | 0>(0);
  let body = null;
  if (infoLevel === 0 || status === -1) {
    body = (
      <React.Fragment>
        <div className={classes.root}>
          <Button
            onClick={() => {
              setInfoLevel(1);
            }}
            disabled={status === -1}
            variant="outlined"
            size="small"
            color="secondary"
          >
            Start New Game
          </Button>
          <Typography variant="body2">
            {status === -1 ? "Please Login to start the Game" : ""}
          </Typography>
          <Typography variant="body1" align="center">
          <br />
            You can send Invitation to your friend using Email, Please ask your
            friend to login once if he/she hasn't even once.
          </Typography>
        </div>
      </React.Fragment>
    );
  } else {
    body = (
      <React.Fragment>
        <Typography variant="h6" align="center">
          Invite Your Friend
          <InvitationForm />
        </Typography>
      </React.Fragment>
    );
  }

  return <React.Fragment>{body}</React.Fragment>;
};

export default Information;
