import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  Drawer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import HistoryIcon from '@material-ui/icons/History';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
  },
}));

interface DrawerProps {
  open: boolean;
}

export default function AppDrawer({ open }: DrawerProps) {
  const classes = useStyles();
  return (
    <Drawer
    open={open}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Toolbar />
      <div>
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/game">
            <ListItem button>
              <ListItemIcon>
                <PlayArrowIcon />
              </ListItemIcon>
              <ListItemText primary={"Game"} />
            </ListItem>
          </Link>
          <Link to="/playground">
            <ListItem button>
              <ListItemIcon>
                <ChangeHistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Playground"} />
            </ListItem>
          </Link>
          <Link to="/invitation">
            <ListItem button>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary={"Invitations"} />
            </ListItem>
          </Link>
          <Link to="/history">
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"History"} />
            </ListItem>
          </Link>
        </List>
      </div>
    </Drawer>
  );
}
