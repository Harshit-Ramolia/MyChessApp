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
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    zIndex: 100,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: "hidden",
    border: "none",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface DrawerProps {
  open: boolean;
  setOpen: Function;
}

export default function AppDrawer({ open, setOpen }: DrawerProps) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const drawerBody = (
    <React.Fragment>
      <Toolbar />
      <div>
        <List>
          <Link to="/" onClick={handleClose}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/game" onClick={handleClose}>
            <ListItem button>
              <ListItemIcon>
                <PlayArrowIcon />
              </ListItemIcon>
              <ListItemText primary={"Game"} />
            </ListItem>
          </Link>
          <Link to="/playground" onClick={handleClose}>
            <ListItem button>
              <ListItemIcon>
                <ChangeHistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Playground"} />
            </ListItem>
          </Link>
          <Link to="/invitations" onClick={handleClose}>
            <ListItem button>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary={"Invitations"} />
            </ListItem>
          </Link>
          <Link to="/history" onClick={handleClose}>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"History"} />
            </ListItem>
          </Link>
        </List>
      </div>
    </React.Fragment>
  );

  return (
    <Drawer
      open={open}
      className={classes.drawer}
      style={{ zIndex: 100 }}
      onClose={handleClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {drawerBody}
    </Drawer>
  );
}
