import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { useCancelInvitationMutation } from "../../generated/graphql";

interface WaitingProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Waiting: React.FC<WaitingProps> = () => {
  const classes = useStyles();
  const [, cancelInvitation] = useCancelInvitationMutation();
  return (
    <div className={classes.root}>
      <Typography>Waiting for your friend to start the game...</Typography>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={() => cancelInvitation()}
      >
        Cancel Invitation
      </Button>
    </div>
  );
};

export default Waiting;
