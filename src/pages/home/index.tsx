import { Typography, Theme, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    color: theme.palette.primary.main,
    // fontWeight: 500,
    fontSize: "18px",
  },
  span: {
    color: theme.palette.secondary.main,
  },
}));

const Home: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h4">
        Welcome to online one to one chess Game
      </Typography>
      <br />
      <Typography variant="body1" className={classes.body}>
        Play with your{" "}
        <Link to="/game">
          <span className={classes.span}>friend</span>
        </Link>{" "}
        online .
      </Typography>
      <Typography variant="body1" className={classes.body}>
        Watch your played games to find mistakes and improve in{" "}
        <Link to="/history">
          <span className={classes.span}>history</span>
        </Link>
        .
      </Typography>
      <Typography variant="body1" className={classes.body}>
        Prepare your strategies for next games at{" "}
        <Link to="/playground">
          <span className={classes.span}>playground</span>
        </Link>
        .
      </Typography>
      <Typography variant="body1" className={classes.body}>
        And don't forget to checkout for invitations from your friends to play game at{" "}
        <Link to="/invitations">
          <span className={classes.span}>invitations</span>
        </Link>
        .
      </Typography>
      
      <br />
      <Typography variant="h6">Developer Info</Typography>
      <Typography variant="body1" className={classes.body}>
        This web application is developed by{" "}
        <a
          href="https://www.linkedin.com/in/harshit-ramolia/"
          target="_blank"
          className={classes.span}
          rel="noreferrer"
        >
          Harshit Ramolia
        </a>{" "}
        (BTech 19 student pursuing Computer Science And Electrical Engineering
        at IITGn). In case of suggestions or feedback please{" "}
        <a href="mailto:harshitramolia@gmail.com">
          <span className={classes.span}>contact</span>
        </a>
        .
      </Typography>
    </React.Fragment>
  );
};

export default Home;
