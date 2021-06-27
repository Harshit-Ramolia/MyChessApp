import React from "react";
import { CircularProgress, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme:Theme) => ({
  fallback: {
    color: theme.palette.secondary.main,
  }
}))

function Fallback() {
  const classes = useStyles();
  return (
    <div>
      <CircularProgress
        style={{ position: "fixed", top: "50%", left: "50%" }}
        className={classes.fallback}
      />
    </div>
  );
}

export default Fallback;
