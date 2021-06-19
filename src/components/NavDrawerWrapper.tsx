import { Container, Grid, Theme, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Drawer from "./Drawer";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

interface NavDrawerWrapperProps {}

const NavDrawerWrapper: React.FC<NavDrawerWrapperProps> = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState<Boolean>(true);
  return (
    <React.Fragment>
      <Navbar setOpen={setOpen} />
      <Drawer open={open} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </React.Fragment>
  );
};

export default NavDrawerWrapper;
