import React from "react";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import GoogleLoginComponent from "./GoogleLogin";
import { useMeQuery } from "../generated/graphql";
import LogoutComponent from "./Logout";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.secondary.light,
    background: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: "18px",
    fontWeight: 800,
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: "22px",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

interface NavbarProps {
  setOpen: Function;
}

export default function PrimarySearchAppBar({ setOpen }: NavbarProps) {
  const classes = useStyles();
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (!fetching) {
    if (!data?.me) {
      body = <GoogleLoginComponent />;
    } else {
      body = (
        <React.Fragment>
          <Typography>{data.me.username}</Typography>
          <LogoutComponent />
        </React.Fragment>
      );
    }
  }
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen((prev: Boolean) => !prev);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap>
              MYCHESSAPP
            </Typography>
          </Link>
          <div className={classes.grow} />
          {body}
          <Hidden smDown>
          <div style={{ width: "100px" }}></div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
