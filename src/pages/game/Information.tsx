import { Button, Typography } from "@material-ui/core";
import InvitationForm from "./InvitationForm";
import React, { useState } from "react";

interface InformationProps {
  status: Number;
}

const Information: React.FC<InformationProps> = ({ status }) => {
  const [infoLevel, setInfoLevel] = useState<1 | 0>(0);
  let body = null;
  if (infoLevel === 0 || status === -1) {
    body = (
      <React.Fragment>
        <Typography>This is information</Typography>
        <Button
          onClick={() => {
            setInfoLevel(1);
          }}
          disabled={status === -1}
        >
          Start New Game
        </Button>
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
